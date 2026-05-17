import { Flower } from '@/components/Flower';
import { Scribble } from '@/components/Scribble';
import { Reveal } from '@/components/Reveal';

type Props = {
  kicker?: string;
  quote: string; // use \n para quebrar
  attribution?: string;
};

/**
 * O texto que pousa. Sem foto — o silêncio visual amplifica a frase, e o
 * glow da atmosfera guia o olhar.
 */
export function Manifesto({ kicker, quote, attribution }: Props) {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-[6vw] py-[14vh]">
      <Flower
        className="absolute right-[12%] top-[15%] animate-floatY opacity-50"
        size={64}
      />
      <Scribble className="absolute bottom-[20%] left-[10%] w-56 opacity-50" />

      {kicker && (
        <Reveal>
          <span className="mb-12 block font-mono text-[10px] uppercase tracking-widest text-subtle">
            {kicker}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <blockquote className="max-w-[14ch] whitespace-pre-line font-serif text-[clamp(2.25rem,7vw,6.5rem)] font-light italic leading-[1.05] tracking-tight text-ink">
          {/* EDITAR */}
          {quote}
        </blockquote>
      </Reveal>
      {attribution && (
        <Reveal delay={0.25}>
          <span className="mt-12 block font-script text-3xl text-subtle">
            {attribution}
          </span>
        </Reveal>
      )}
    </section>
  );
}
