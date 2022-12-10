import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';

export const Clock = () => {
  const [time, setTime] = useState<Dayjs>(dayjs());
  const timeOfDay = useMemo(() => {
    const hour = time.hour();
    if (hour >= 22) {
      return "Night, it's the prime time to grind";
    } else if (hour >= 17) {
      return 'Evening, continue with your grindset';
    } else if (hour >= 12) {
      return 'Afternoon, focus your grindset';
    } else {
      return 'Morning, up your grindset';
    }
  }, [time.hour()]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime((prev) => dayjs());
      console.log('timeInterval');
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <>
      <p class="text-6xl font-light w-max mx-auto select-none text-white">
        {time.format('HH:mm:ss')}
      </p>
      <p class="block text-2xl font-light  w-max mt-2 mx-auto select-none text-white">
        Good {timeOfDay}!
      </p>
    </>
  );
};
