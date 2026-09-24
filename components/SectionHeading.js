export default function SectionHeading({ icon: Icon, label, title, description, className = '', ...rest }) {
  return (
    <div className={className} {...rest}>
      <div className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyber-lime">
        <Icon size={16} aria-hidden="true" />
        <span>{label}</span>
      </div>
      <h2 className="font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      {description && <p className="mt-2 max-w-2xl text-base text-zinc-400">{description}</p>}
    </div>
  );
}
