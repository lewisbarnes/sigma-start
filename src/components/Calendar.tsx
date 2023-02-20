import dayjs from 'dayjs';

export const Calendar = () => {
  const date = dayjs();
  const lastMonth = date.clone().set('month', date.month() - 1);
  const firstDay = date.clone().set('date', 1);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div class="max-w-[50vmin] mx-auto bg-black/60 rounded-md">
      <div class="text-white text-center mx-auto rounded-t-md py-2 text-xl font-bold">
        {date.format('MMMM')}
      </div>
      <div class="text-white grid grid-cols-7 rounded-b-md  py-2 text-xs">
        {days.map((x) => (
          <span>{x.substring(0, 3).toUpperCase()}</span>
        ))}
      </div>
      <div class="mx-auto text-white grid grid-cols-7 rounded-b-md text-xs">
        {Array.from(new Array(42)).map((x, i) => (
          <p
            class={`${
              (i + 1) % 7 ? 'border-r' : ''
            } border-zinc-500 last-of-type:border-r-0 ${'border-t'} aspect-square p-2 ${
              i == 34 || i == 41 ? 'rounded-b-md' : ''
            }`}
          >
            {i - firstDay.day() < date.daysInMonth() ? (
              i < firstDay.day() ? (
                <span class="text-zinc-500">
                  {lastMonth.daysInMonth() - firstDay.day() + 1 + i}
                </span>
              ) : i + 1 - firstDay.day() == date.date() ? (
                <div className="bg-white text-black rounded-full w-6 aspect-square flex -mt-1 -ml-1 justify-center items-center">
                  <p className="">{i + 1 - firstDay.day()}</p>
                </div>
              ) : (
                <span>{i + 1 - firstDay.day()}</span>
              )
            ) : (
              <span class="text-zinc-500">{i + 1 - firstDay.day() - date.daysInMonth()}</span>
            )}
          </p>
        ))}
      </div>
    </div>
  );
};
