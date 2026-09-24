'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ProjectNotes({ notes, accentText }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="mt-5">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-zinc-400 transition-colors hover:border-white/25 hover:text-white"
      >
        <span>
          Build notes <span className={accentText}>({String(notes.length).padStart(2, '0')})</span>
        </span>
        <ChevronDown size={15} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div id={id} className="disclosure" data-open={open}>
        <div>
          <ol className="space-y-3 pt-4 text-sm leading-relaxed text-zinc-400">
            {notes.map((note, i) => (
              <li key={i} className="flex gap-3">
                <span className={`font-mono text-[11px] ${accentText}`}>{String(i + 1).padStart(2, '0')}</span>
                <span>{note}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
