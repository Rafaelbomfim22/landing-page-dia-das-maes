'use client';
import dynamic from 'next/dynamic';

// Carrega o canvas R3F só no cliente (ssr:false) — sem WebGL no servidor,
// sem mismatch de hidratação, sem setState em effect.
const AmbientBlobs = dynamic(
  () => import('./AmbientBlobs').then((m) => m.AmbientBlobs),
  { ssr: false },
);

export function AmbientBlobsClient() {
  return <AmbientBlobs />;
}
