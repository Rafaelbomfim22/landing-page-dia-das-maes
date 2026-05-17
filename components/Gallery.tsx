import { Polaroid } from '@/components/Polaroid';
import { Scribble } from '@/components/Scribble';
import { Flower } from '@/components/Flower';
import { Reveal } from '@/components/Reveal';

type Shot = {
  src: string;
  alt: string;
  caption?: string;
  rotate?: number;
  aspect?: string;
};

type Props = {
  kicker: string;
  phrase: string; // frase serif itálica no meio
  closing: string; // frase de fechamento (serif)
  closingEmphasis?: string;
  photos: Shot[];
};

// Composição curada e assimétrica — polaroids quebram o grid de propósito.
const SLOTS = [
  { col: 'md:col-span-5 md:col-start-1', mt: '', rot: -4, tape: true },
  { col: 'md:col-span-4 md:col-start-9', mt: 'md:mt-32', rot: 3, tape: true },
  { col: 'md:col-span-6 md:col-start-4', mt: 'md:-mt-20', rot: -3, tape: true },
  { col: 'md:col-span-3 md:col-start-2', mt: 'md:mt-10', rot: -7, tape: false },
  { col: 'md:col-span-5 md:col-start-8', mt: 'md:-mt-10', rot: 4, tape: true },
];

/**
 * Capítulo 04 · galeria editorial assimétrica. Aceita N fotos — todas
 * aparecem, nunca numa grade regular.
 */
export function Gallery({
  kicker,
  phrase,
  closing,
  closingEmphasis,
  photos,
}: Props) {
  return (
    <section className="relative overflow-hidden px-[6vw] py-[16vh]">
      <Reveal>
        <span className="font-mono text-[10px] uppercase tracking-widest text-subtle">
          {kicker}
        </span>
      </Reveal>

      <Scribble className="absolute right-[10%] top-[8%] w-40 opacity-55" />

      <div className="relative mt-20 grid grid-cols-12 gap-x-6 gap-y-28">
        {photos.map((p, i) => {
          const s = SLOTS[i % SLOTS.length];
          return (
            <div key={p.src + i} className="contents">
              <Polaroid
                src={p.src}
                alt={p.alt}
                caption={p.caption}
                rotate={p.rotate ?? s.rot}
                withTape={s.tape}
                aspect={p.aspect}
                className={`col-span-12 ${s.col} ${s.mt}`}
              />

              {/* Frase manuscrita no meio da galeria */}
              {i === 1 && (
                <div className="col-span-12 self-center md:col-span-4 md:col-start-2 md:mt-24">
                  <Flower className="mb-5" size={46} />
                  <Reveal>
                    <p className="whitespace-pre-line font-serif text-[clamp(1.5rem,2.4vw,2.25rem)] font-light italic leading-relaxed text-ink/80">
                      {/* EDITAR */}
                      {phrase}
                    </p>
                  </Reveal>
                </div>
              )}
            </div>
          );
        })}

        {/* Fechamento */}
        <h3 className="col-span-12 mt-12 whitespace-pre-line font-serif text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1.05] text-ink md:col-span-7 md:col-start-6">
          <Reveal>
            <span className="block">
              {/* EDITAR */}
              {closing}
              {closingEmphasis && (
                <>
                  {' '}
                  <em className="italic">{closingEmphasis}</em>
                </>
              )}
            </span>
          </Reveal>
        </h3>
      </div>
    </section>
  );
}
