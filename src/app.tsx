import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import './app.css';
import { Clock } from './components/Clock';
import { SigmaQuote } from './components/SigmaQuote';
import bgImage from './assets/bg-image.webp';
import { LinkList } from './components/LinkList';
import { SearchBar } from './components/SearchBar';

export function App() {
  return (
    <div
      class="absolute w-screen min-h-screen h-[100%] z-0"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat-y',
        backgroundSize: 'cover',
      }}
    >
      <div class=" absolute w-screen h-screen pt-16 z-10 bg-gradient-to-b from-black via-blue-800/60 to-transparent bg-opacity-50">
        <div class="z-50 space-y-4">
          <Clock />
          <SearchBar />
          <SigmaQuote />
          <div class="absolute bottom-4 left-4 right-4 text-center text-white font-light tracking-widest text-2xl font-mono select-none">
            YOU ARE SIGMA
          </div>
        </div>
      </div>
    </div>
  );
}
