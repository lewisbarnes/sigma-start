import { useEffect, useMemo, useState } from 'preact/hooks';
import { getRandomArrayItem } from '../utils/misc';
import { QUOTES, AUTHORS } from '../assets/sigmaQuotes';
import sigma from '../assets/sigma.webp';

export const SigmaQuote = () => {
  const [refresh, setRefresh] = useState<number>(0);
  const [refreshInterval, setRefreshInterval] = useState<number>(30000);

  const quote = useMemo(() => {
    return {
      text: getRandomArrayItem(QUOTES) || QUOTES[4],
      author: getRandomArrayItem(AUTHORS) || AUTHORS[2],
    };
  }, [refresh]);

  useEffect(() => {
    const interval = setInterval(() => setRefresh(Math.random()), refreshInterval);
    return () => {
      clearInterval(interval);
    };
  }, [refreshInterval]);

  return (
    <div class="flex flex-col gap-2 items-center mx-auto text-white font-bold">
      <p class="">{quote.text}</p>
      <p class="text-sm text-yellow-500">{quote.author}</p>
    </div>
  );
};
