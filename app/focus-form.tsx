'use client';
import { useEffect, useRef, type ComponentProps } from 'react';

/** Moves keyboard focus into an opened editor and restores it to its trigger. */
export function FocusForm({
  restoreFocus,
  ...props
}: ComponentProps<'form'> & { restoreFocus?: string }) {
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    ref.current
      ?.querySelector<HTMLElement>(
        'input:not([type="hidden"]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled)',
      )
      ?.focus();
    return () => {
      queueMicrotask(() => {
        const replacement = restoreFocus ? document.querySelector<HTMLElement>(restoreFocus) : null;
        if (replacement) replacement.focus();
        else if (trigger?.isConnected) trigger.focus();
      });
    };
  }, [restoreFocus]);
  return <form {...props} ref={ref} />;
}
