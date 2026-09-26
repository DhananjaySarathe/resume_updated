import { CopyChip } from './ContactWidgets';

const count = (n, one, many, none) => (n === 0 ? none : `${n} ${n === 1 ? one : many}`);

// What Prunify found when it ran on this site's own code at build time.
export default function PrunifyResult({ data }) {
  return (
    <div className="mb-6 rounded-lg bg-surface-container/60 p-4">
      {data && (
        <p className="mb-3 text-body-sm text-on-surface-variant">
          <span className="text-on-surface">It runs on this site before every deploy.</span> Last build:{' '}
          {data.files} files checked, {count(data.deadFiles + data.deadExports, 'piece of dead code', 'pieces of dead code', 'no dead code')},{' '}
          {count(data.cycles, 'import cycle', 'import cycles', 'no import cycles')},{' '}
          {count(data.unusedAssets, 'unused asset', 'unused assets', 'no unused assets')}.
        </p>
      )}
      <CopyChip text="npx prunify" />
    </div>
  );
}
