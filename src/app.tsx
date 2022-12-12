import dayjs from 'dayjs';
import { useState } from 'preact/hooks';
import './app.css';
import bgImage from './assets/bg-image.webp';
import { Calendar } from './components/Calendar';
import { Clock } from './components/Clock';
import { QuickLinks } from './components/QuickLinks';
import { SearchBar } from './components/SearchBar';
import { SigmaQuote } from './components/SigmaQuote';

export function App() {
  const [showQuotes, setShowQuotes] = useState(true);

  return (
    <div
      class="min-h-full absolute w-full pb-8"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: 'fixed',
        backgroundRepeat: 'repeat-y',
        backgroundSize: '',
      }}
    >
      <div class="min-h-full bg-gradient-to-b from-black via-blue-800/60 to-transparent bg-opacity-50">
        <button className="fixed w-max top-4 right-4 text-white px-2 rounded-full border border-zinc-500">
          Settings
        </button>
        <div class="z-50 pt-8 space-y-4">
          <Clock />
          <QuickLinks />
          <div class="sticky top-4 left-0 right-0">
            <SearchBar />
          </div>
          {!showQuotes && <SigmaQuote />}
          <Calendar />
        </div>
      </div>
    </div>
  );
}
