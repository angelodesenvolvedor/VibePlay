'use client';

import React, { useContext, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { HomeContext } from './context/HomeContext';
import { musics } from './dados/music';

const Home: React.FC = () => {
  const context = useContext(HomeContext);

  if (!context) {
    throw new Error('HomeContext must be used within a HomeContextProvider');
  }

  const [selectedMusic, setSelectedMusic] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (selectedMusic !== null) {
      const music = musics.find(m => m.id === selectedMusic);

      if (music) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = '';
        }

        const newAudio = new Audio(music.urlAudio);
        audioRef.current = newAudio;

        newAudio.addEventListener('play', () => setIsPlaying(true));
        newAudio.addEventListener('pause', () => setIsPlaying(false));

        if (isPlaying) {
          newAudio.play();
        }

        return () => {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = '';
            audioRef.current.removeEventListener('play', () => setIsPlaying(true));
            audioRef.current.removeEventListener('pause', () => setIsPlaying(false));
            audioRef.current = null;
          }
        };
      }
    }
  }, [selectedMusic, isPlaying]);

  const handleMusicClick = (musicId: number) => {
    if (selectedMusic === musicId) {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }

      const music = musics.find(m => m.id === musicId);
      if (music) {
        const newAudio = new Audio(music.urlAudio);
        audioRef.current = newAudio;
        setIsPlaying(true);
        newAudio.play();
      }

      setSelectedMusic(musicId);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="bg-gray-900 text-white py-4 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-screen-lg mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl sm:text-4xl font-bold">VibePlay</h1>
          <nav className="flex space-x-4 text-sm sm:text-base">
            <a href="#home" className="text-gray-300 hover:text-white transition-colors duration-300">
              Início
            </a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300">
              Sobre
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-300">
              Contato
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center p-8 bg-gradient-to-br from-gray-900 to-gray-800 pt-20 sm:pt-24 md:pt-32">
        <div className="flex flex-col items-center w-full max-w-screen-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {musics.map((music) => (
              <div
                key={music.id}
                className={`relative p-6 border border-gray-700 rounded-lg cursor-pointer transition-transform transform hover:scale-105 ${
                  selectedMusic === music.id ? 'bg-gray-800' : 'bg-gray-900'
                }`}
                onClick={() => handleMusicClick(music.id)}
              >
                <Image
                  src={music.image}
                  alt={music.name}
                  width={300}
                  height={300}
                  className="object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-lg sm:text-xl font-semibold text-white">{music.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMusicClick(music.id);
                    }}
                    className={`absolute bottom-4 right-4 p-3 rounded-full text-white focus:outline-none transition-colors duration-300 ${
                      selectedMusic === music.id && isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {selectedMusic === music.id && isPlaying ? 'Pausar' : 'Reproduzir'}
                  </button>
                </div>
                <h2 className="text-lg sm:text-xl font-semibold mt-4">{music.name}</h2>
                <p className="text-gray-400 mt-1">{music.artist}</p>
                <p className="text-gray-500 mt-1">{music.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="bg-gray-900 text-white py-6 text-center">
        <div className="max-w-screen-lg mx-auto px-4">
          <p className="text-sm mb-2">© {new Date().getFullYear()} Desenvolvido por Ângelo Silvano</p>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/angelodesenvolvedor" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors duration-300">
              GitHub
            </a>
            <a href="https://linkedin.com/in/angelosilvanno" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors duration-300">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;