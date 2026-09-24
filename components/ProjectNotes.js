'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ProjectNotes({ notes, accentText }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="mt-4">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-lg bg-surface-container/70 px-3 py-2 text-label-sm uppercase tracking-widest text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
      >
        <span>
          Build notes <span className={accentText}>({String(notes.length).padStart(2, '0')})</span>
        </span>
        <ChevronDown size={15} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div id={id} className="disclosure" data-open={open}>
        <div>
          <ol className="space-y-3 pt-4 text-body-sm text-on-surface-variant">
            {notes.map((note, i) => (
              <li key={i} className="flex gap-3">
                <span className={`font-mono text-label-sm ${accentText}`}>{String(i + 1).padStart(2, '0')}</span>
                <span>{note}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
