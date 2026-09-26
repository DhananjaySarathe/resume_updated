'use client';

import { useEffect, useState } from 'react';

// Read after mount: the 404 is prerendered once, so the server can't know the address.
export default function RequestedPath() {
  const [path, setPath] = useState(null);

  useEffect(() => setPath(window.location.pathname), []);

  return path ? <span className="break-all font-mono text-on-surface">{path}</span> : 'This address';
}
