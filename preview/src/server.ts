// In-browser "server": routes /api/* fetches to the real Next route handlers.
import * as portal from '../../app/api/portal/route';
import * as workforce from '../../app/api/workforce/route';
import * as hours from '../../app/api/hours/route';
import * as leave from '../../app/api/leave/route';
import { TEAM, certs } from './microsoft';

type Handler = { GET?: (r: Request) => Promise<Response>; POST?: (r: Request) => Promise<Response> };
const routes: Record<string, Handler> = {
  '/api/portal': portal,
  '/api/workforce': workforce,
  '/api/hours': hours,
  '/api/leave': leave,
};
const ORIGIN = 'https://hmf-preview.local';
const jar = new Map<string, string>();

// Browsers hide Set-Cookie on responses built in page code, so record it as the route creates it.
const issuedCookie = new WeakMap<Response, string>();
function setCookieFrom(init?: ResponseInit) {
  const h = init?.headers;
  if (!h) return null;
  if (h instanceof Headers) return h.get('set-cookie');
  const entries = Array.isArray(h) ? h : Object.entries(h);
  return entries.find(([k]) => k.toLowerCase() === 'set-cookie')?.[1] ?? null;
}
const originalJson = Response.json.bind(Response);
Response.json = (data: unknown, init?: ResponseInit) => {
  const response = originalJson(data, init);
  const cookie = setCookieFrom(init);
  if (cookie) issuedCookie.set(response, cookie);
  return response;
};

export function installServer() {
  const realFetch = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const raw = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    const url = new URL(raw, ORIGIN);
    if (url.host === TEAM && url.pathname === '/cdn-cgi/access/certs') return Response.json(certs());
    const route = url.pathname.startsWith('/api/') ? routes[url.pathname] : undefined;
    if (!route) return realFetch(input, init);
    const method = (init?.method || (input instanceof Request ? input.method : 'GET')).toUpperCase();
    const handler = method === 'POST' ? route.POST : route.GET;
    if (!handler) return new Response('Method not allowed', { status: 405 });
    const headers = new Headers(init?.headers);
    // A browser always attaches Origin to same-origin POSTs; the app's CSRF check requires it.
    if (method === 'POST') headers.set('origin', ORIGIN);
    if (jar.size) headers.set('cookie', [...jar].map(([k, v]) => k + '=' + v).join('; '));
    const request = new Request(new URL(url.pathname + url.search, ORIGIN), {
      method,
      headers,
      body: method === 'POST' ? init?.body : undefined,
    });
    // Browsers drop "forbidden" headers (Origin, Cookie) from page-built Requests.
    // A standalone Headers object keeps them, so hand the route that one.
    Object.defineProperty(request, 'headers', { value: headers });
    // Small delay so loading states behave like a real network.
    await new Promise((r) => setTimeout(r, 60));
    const response = await handler(request);
    const setCookie = issuedCookie.get(response) ?? null;
    if (setCookie) {
      const [pair, ...attrs] = setCookie.split(';');
      const [name, ...rest] = pair.split('=');
      const value = rest.join('=');
      const expired = attrs.some((a) => /max-age=0/i.test(a.trim()));
      if (expired || !value) jar.delete(name.trim());
      else jar.set(name.trim(), value);
      try {
        if (expired || !value) sessionStorage.removeItem('hmf-preview-cookie');
        else sessionStorage.setItem('hmf-preview-cookie', JSON.stringify([...jar]));
      } catch {}
    }
    return response;
  };
  try {
    const saved = sessionStorage.getItem('hmf-preview-cookie');
    if (saved) for (const [k, v] of JSON.parse(saved)) jar.set(k, v);
  } catch {}
}
