import dayjs from 'dayjs';
import { useState } from 'preact/hooks';
import { signal } from '@preact/signals';
import './app.css';
import bgImage from './assets/bg-image.webp';
import { Calendar } from './components/Calendar';
import { Clock } from './components/Clock';
import { LinkShortener } from './components/LinkShortener';
import { QuickLinks } from './components/QuickLinks';
import { SearchBar } from './components/SearchBar';
import { SigmaQuote } from './components/SigmaQuote';
import youtube from './assets/youtube.svg';
import twitch from './assets/twitch.svg';
import { createContext } from 'preact';

export const Mode = createContext('view');

export function App() {
  const [showQuotes, setShowQuotes] = useState(true);

  const [modeState, setModeState] = useState('view');

  return (
    <>
      <Mode.Provider value={modeState}>
        <div
          class="h-screen bg-black font-mono p-4 flex flex-col"
          // style={{
          //   backgroundImage: `url(${bgImage})`,
          //   backgroundPosition: 'static',
          //   backgroundRepeat: 'repeat-y',
          //   backgroundSize: '',
          // }}
        >
          <div class="z-50 space-y-4">
            <Clock />
            <SigmaQuote />
            <QuickLinks />
          </div>
          <div class="flex-grow"></div>
          <div class="text-white flex items-center font-mono">
            <button
              onClick={() =>
                setModeState((mode) => {
                  return mode == 'edit' || mode == 'select' ? 'view' : 'edit';
                })
              }
              class={
                modeState == 'edit' || modeState == 'select'
                  ? 'bg-white text-black rounded-md'
                  : 'hover:invert bg-black rounded-md'
              }
            >
              Edit Mode
            </button>
          </div>
        </div>
      </Mode.Provider>
    </>
  );
}
