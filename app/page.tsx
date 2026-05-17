import { Hero } from '@/components/Hero';
import { Chapter } from '@/components/Chapter';
import { Manifesto } from '@/components/Manifesto';
import { Gallery } from '@/components/Gallery';
import { Footer } from '@/components/Footer';

// EDITAR: toda a narrativa — frases curtas, que pousam.
export default function Page() {
  return (
    <>
      {/* 00 · Abertura (hero.jpg + hero-mini.jpg) */}
      <Hero />

      {/* 01 · O início */}
      <Chapter
        kicker="Capítulo 01 · O início"
        title={'Antes de eu\nlembrar de tudo,'}
        emphasis="você já cuidava de mim."
        script="a primeira voz que me acalmou"
        body={[
          'Tem um cheiro de casa que eu não sei explicar — só sei que é o seu.',
        ]}
        src="/photos/chapter-01.jpg"
        alt="Ela e o filho, no começo de tudo"
        caption="onde tudo começou"
        rotate={-3}
        decoration="scribble"
      />

      {/* 02 · O cotidiano */}
      <Chapter
        kicker="Capítulo 02 · O cotidiano"
        title={'Os dias comuns\neram,'}
        emphasis="na verdade, os maiores."
        body={[
          'Era no caminho, na espera, no “chegou bem?”. No detalhe miúdo.',
          'Eu só fui entender o tamanho disso depois. Como quase tudo que importa.',
        ]}
        src="/photos/chapter-02.jpg"
        alt="Um dia qualquer, indo a algum lugar juntos"
        caption="indo a qualquer lugar, com você"
        rotate={3}
        reverse
        decoration="flower"
      />

      {/* 03 · O que você me ensinou */}
      <Manifesto
        kicker="Capítulo 03 · O que você me ensinou"
        quote={'Tudo\nque sou\ncomeça\nem você.'}
        attribution="— e sempre vai"
      />

      {/* 04 · As pequenas coisas (4 fotos) */}
      <Gallery
        kicker="Capítulo 04 · As pequenas coisas"
        phrase={'Você ria\nmesmo quando\nera difícil.'}
        closing={'Todo dia comum'}
        closingEmphasis="era um milagre pequeno."
        photos={[
          {
            src: '/photos/gallery-01.jpg',
            alt: 'Um passeio especial',
            caption: 'aquele passeio',
            rotate: -4,
          },
          {
            src: '/photos/gallery-02.jpg',
            alt: 'Lado a lado',
            caption: 'lado a lado, sempre',
            rotate: 3,
          },
          {
            src: '/photos/gallery-03.jpg',
            alt: 'Festa junina, de chapéu de palha',
            caption: 'arraiá nosso',
            rotate: -3,
          },
          {
            src: '/photos/gallery-04.jpg',
            alt: 'Selfie na viagem, rindo',
            caption: 'na estrada, rindo à toa',
            rotate: 4,
            aspect: '4/3',
          },
        ]}
      />

      {/* 05 · Gratidão */}
      <Chapter
        kicker="Capítulo 05 · Gratidão"
        title={'O que vem agora'}
        emphasis="também é seu."
        script="feliz dia das mães, mãe"
        body={[
          'Tudo o que eu construir vai ter um pouco do que você plantou.',
          'Hoje, e em todos os dias que eu ainda não vivi.',
        ]}
        src="/photos/chapter-05.jpg"
        alt="Um abraço apertado, os dois rindo"
        caption="você e eu, sempre."
        rotate={-2}
        reverse
        decoration="flower"
      />

      {/* 06 · A carta */}
      <Footer />
    </>
  );
}
