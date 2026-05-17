import { Polaroid } from '@/components/Polaroid';
import { Flower } from '@/components/Flower';
import { Scribble } from '@/components/Scribble';
import { Reveal } from '@/components/Reveal';

type Props = {
  kicker: string;
  title: string; // pode usar \n
  emphasis?: string; // linha em itálico (serif)
  script?: string; // frase manuscrita curta (Caveat)
  body?: string[];
  src: string;
  alt: string;
  caption?: string;
  rotate?: number;
  reverse?: boolean;
  decoration?: 'flower' | 'scribble' | 'none';
};

/**
 * Capítulo editorial: polaroid de um lado, texto do outro, uma decoração
 * só. Muito respiro — ritmo de filme.
 */
export function Chapter({
  kicker,
  title,
  emphasis,
  script,
  body = [],
  src,
  alt,
  caption,
  rotate = -3,
  reverse = false,
  decoration = 'scribble',
}: Props) {
  return (
    <section className="relative overflow-hidden px-[6vw] py-[16vh]">
      {decoration === 'flower' && (
        <Flower
          className={`absolute top-[14%] animate-floatY opacity-55 ${
            reverse ? 'left-[10%]' : 'right-[11%]'
          }`}
          size={62}
        />
      )}
      {decoration === 'scribble' && (
        <Scribble
          className={`absolute bottom-[16%] w-44 opacity-60 ${
            reverse ? 'right-[9%]' : 'left-[8%]'
          }`}
        />
      )}

      <div className="relative mx-auto grid max-w-6xl grid-cols-12 items-center gap-y-16 md:gap-x-12">
        {/* Polaroid */}
        <div
          className={`col-span-12 md:col-span-5 ${
            reverse ? 'md:order-2 md:col-start-8' : 'md:order-1 md:col-start-1'
          }`}
        >
          <Polaroid
            src={src}
            alt={alt}
            caption={caption}
            rotate={rotate}
            className="w-[80%] md:w-full"
          />
        </div>

        {/* Texto */}
        <div
          className={`col-span-12 md:col-span-6 ${
            reverse ? 'md:order-1 md:col-start-1' : 'md:order-2 md:col-start-7'
          }`}
        >
          <Reveal>
            <span className="block font-mono text-[10px] uppercase tracking-widest text-subtle">
              {kicker}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 whitespace-pre-line font-serif text-[clamp(2rem,5vw,4.25rem)] font-light leading-[1.04] tracking-tight text-ink">
              {title}
              {emphasis && (
                <>
                  {' '}
                  <em className="italic">{emphasis}</em>
                </>
              )}
            </h2>
          </Reveal>
          {script && (
            <Reveal delay={0.18}>
              <p className="mt-6 font-script text-3xl leading-tight text-subtle">
                {script}
              </p>
            </Reveal>
          )}
          {body.length > 0 && (
            <div className="mt-8 space-y-5 md:max-w-md">
              {body.map((p, i) => (
                <Reveal key={i} delay={0.24 + i * 0.08}>
                  <p
                    className={
                      i === 0
                        ? 'font-serif text-[clamp(1.05rem,1.5vw,1.4rem)] font-light italic leading-relaxed text-ink/80'
                        : 'text-[15px] leading-relaxed text-subtle'
                    }
                  >
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
