'use client';

import { useEffect, useState } from 'react';
import { CheckCheck, Copy } from 'lucide-react';

function useCopy(text, onFail) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      onFail?.();
    }
  };

  return [copied, copy];
}

export function CopyChip({ text }) {
  const [copied, copy] = useCopy(text);

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${text}`}
      className="inline-flex items-center gap-2 rounded-lg bg-surface-container-high px-3 py-2 font-mono text-label-md text-on-surface transition-colors hover:bg-surface-bright"
    >
      {text}
      {copied ? (
        <CheckCheck size={14} aria-hidden="true" className="text-primary" />
      ) : (
        <Copy size={14} aria-hidden="true" className="text-on-surface-variant" />
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  );
}
