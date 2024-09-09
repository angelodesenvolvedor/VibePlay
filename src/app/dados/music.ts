// src/app/dados/music.ts
export interface Music {
  id: number;
  name: string;
  image: string;
  description: string;
  artist: string;
  urlAudio: string; // Adicionando a propriedade urlAudio
}

export const musics: Music[] = [
  {
    id: 1,
    name: "Primeiros Erros (Chove)",
    image: "/image/primeiroserros.jpg",  // Atualize o caminho da imagem
    description: "Canção clássica do Capital Inicial que fala sobre os primeiros erros e reflexões da juventude.",
    artist: "Capital Inicial",
    urlAudio: "/audios/primeiros-erros.mp3", // Caminho para o áudio
  },
  {
    id: 2,
    name: "Vou Deixar",
    image: "/image/vou-deixar.jpg",  // Adicione a imagem correspondente
    description: "Música conhecida da banda Skank que fala sobre liberdade e autodescoberta.",
    artist: "Skank",
    urlAudio: "/audios/vou-deixar.mp3",  // Adicione o caminho para o áudio
  },
  {
    id: 3,
    name: "Nossos Dias",
    image: "/image/nossos-dias.jpg",  // Atualize o caminho da imagem
    description: "Música do DJ Alok que celebra momentos especiais.",
    artist: "DJ Alok",
    urlAudio: "/audios/nossos-dias.mp3", // Caminho para o áudio
  },
];