import { Polaroid } from '@/components/Polaroid';
import { Flower } from '@/components/Flower';
import { Scribble } from '@/components/Scribble';
import { Reveal } from '@/components/Reveal';

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-[6vw] py-[12vh]">
      {/* Metadados nos cantos */}
      <span className="absolute left-[6vw] top-10 font-mono text-[10px] uppercase tracking-widest text-subtle">
        {/* EDITAR */}
        Um filme para você · Maio 2026
      </span>
      <span className="absolute right-[6vw] top-10 font-mono text-[10px] uppercase tracking-widest text-subtle">
        Capítulo 00 / 06
      </span>

      {/* Decorações flutuando — máx. 2 por viewport */}
      <Flower
        className="absolute right-[13%] top-[18%] animate-floatY opacity-60"
        size={78}
      />
      <Scribble className="absolute left-[7%] top-[34%] w-32 opacity-70" />

      <div className="relative grid w-full grid-cols-12 items-center gap-y-16">
        {/* Polaroid grande à esquerda */}
        <div className="relative z-10 col-span-12 animate-breathe md:col-span-5 md:col-start-1">
          {/* EDITAR: /photos/hero.jpg */}
          <Polaroid
            src="/photos/hero.jpg"
            alt="Eu e minha mãe"
            caption="você e eu, sempre."
            rotate={-3}
            priority
            className="w-[78%] md:w-full"
          />
        </div>

        {/* Título */}
        <div className="relative col-span-12 md:col-span-6 md:col-start-7">
          <Reveal>
            <span className="mb-6 block font-mono text-[10px] uppercase tracking-widest text-subtle">
              Para
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-serif text-[clamp(3rem,8vw,8.5rem)] font-light leading-[0.92] tracking-tight text-ink">
              {/* EDITAR: nome da sua mãe */}
              Marleide,
              <br />
              <em className="italic">meu lar.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 font-script text-3xl text-subtle">
              {/* EDITAR */}
              — uma carta em forma de página
            </p>
          </Reveal>

          {/* Polaroid pequena sobreposta */}
          <div className="absolute -bottom-16 -left-10 hidden md:block">
            <Polaroid
              src="/photos/hero-mini.jpg"
              alt="um instante nosso"
              caption="só nós dois"
              rotate={8}
              className="w-40"
              withTape={false}
            />
          </div>
        </div>
      </div>

      <span className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-floatY font-mono text-[10px] uppercase tracking-widest text-subtle">
        Role com calma ↓
      </span>
    </section>
  );
}
