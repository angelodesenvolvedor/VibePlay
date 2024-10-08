import React, { createContext, useState, ReactNode } from 'react';

type HomeContextType = {
  playing: boolean;
  configPlayPause: () => void;
};

const defaultContext: HomeContextType = {
  playing: false,
  configPlayPause: () => {},
};

export const HomeContext = createContext<HomeContextType>(defaultContext);

export const HomeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [playing, setPlaying] = useState<boolean>(false);

  const configPlayPause = () => {
    setPlaying(!playing);
  };

  return (
    <HomeContext.Provider value={{ playing, configPlayPause }}>
      {children}
    </HomeContext.Provider>
  );
};