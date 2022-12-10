import { useEffect, useMemo, useState } from 'preact/hooks';
import { getRandomArrayItem } from '../utils/misc';
import { QUOTES, AUTHORS } from '../assets/sigmaQuotes';
import sigma from '../assets/sigma.webp';

export const SigmaQuote = () => {
  const [refresh, setRefresh] = useState<number>(0);
  const [refreshInterval, setRefreshInterval] = useState<number>(10000);

  const quote = useMemo(() => {
    return {
      quote: getRandomArrayItem(QUOTES) || QUOTES[4],
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
    <div class="flex gap-4 items-center justify-center mx-auto text-white space-y-2 select-none w-max">
      <div class="w-96">
        <p class="text-sm max-h-[10vh] text-left">{quote.quote}</p>
        <div class="flex flex-row-reverse w-[100%] items-center gap-2 mt-4">
          <p class="text-sm text-right italic font-semibold h-max">{quote.author}</p>
          <img
            src={sigma}
            alt="Image of a true sigma male"
            class="h-8 w-8 rounded-full border"
          ></img>
        </div>
      </div>
    </div>
  );
};
