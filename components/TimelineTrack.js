// A plain vertical line that ties the jobs together.
export default function TimelineTrack({ className = '' }) {
  return <div aria-hidden="true" className={`absolute w-px bg-outline-variant ${className}`} />;
}
