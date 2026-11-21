export function redirect(path: string): never {
  throw new Error('Redirect to ' + path + ' is not available in the preview.');
}
export const useRouter = () => ({ push() {}, replace() {}, refresh() {} });
