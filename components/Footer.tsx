import { Reveal } from '@/components/Reveal';
import { Scribble } from '@/components/Scribble';

/**
 * Capítulo 06 · A carta. O fechamento — texto pessoal e assinatura
 * manuscrita. Sem CTA, sem links: só o que precisa ser dito.
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden px-[6vw] pb-[16vh] pt-[10vh]">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <span className="block font-mono text-[10px] uppercase tracking-widest text-subtle">
            Capítulo 06 · A carta
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-10 font-serif text-[clamp(1.3rem,2.4vw,2rem)] font-light leading-relaxed text-ink/85">
            {/* EDITAR: a carta */}
            Eu sei que nem sempre eu digo. Mas tudo o que eu faço de bom tem um
            pouco de você dentro — a paciência, a teimosia boa, o jeito de não
            desistir. Obrigado por ter sido o meu primeiro lar, e por continuar
            sendo o lugar pra onde eu sempre volto.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 font-script text-4xl text-ink/80">
            {/* EDITAR: assinatura */}
            com todo o meu amor — Rafael Bomfim
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-14 flex items-center gap-5">
            <span className="h-px w-12 bg-[color:var(--atmo-accent,#8a6a52)] opacity-50" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-subtle">
              {/* EDITAR */}
              Para Marleide · Dia das Mães · Maio de 2026
            </span>
          </div>
        </Reveal>

        <Scribble className="mt-12 w-48 opacity-50" />
      </div>
    </footer>
  );
}
