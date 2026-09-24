const markColor = { lime: 'text-cyber-lime', cyan: 'text-cyber-cyan' };

// Renders the items twice so the -50% translate loops seamlessly.
export default function Marquee({ items, itemClassName = '' }) {
  const loop = [...items, ...items];

  return (
    <div className="marquee-track flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
      {loop.map((item, i) => (
        <span key={i} className="flex items-center gap-8" aria-hidden={i >= items.length || undefined}>
          <span className={`flex items-center gap-2 ${itemClassName}`}>
            <span className={markColor[item.accent]}>{item.mark}</span>
            {item.text}
          </span>
          <span className="text-white/20">///</span>
        </span>
      ))}
    </div>
  );
}
