const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });

// Shared by the count-up metrics and the hero facts, so both print a number the same way.
export function formatNumber(n, format) {
  return format === 'compact' ? compact.format(n) : Math.round(n).toString();
}
