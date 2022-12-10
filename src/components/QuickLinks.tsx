export const QuickLinks = () => {
  const links = [
    { title: 'DuckDuckGo', url: 'https://www.duckduckgo.com' },
    { title: 'YouTube', url: 'https://www.youtube.com' },
    { title: 'Twitch', url: 'https://www.twitch.tv' },
    { title: 'Netflix', url: 'https://www.netflix.com' },
  ];

  return (
    <div class="flex gap-4 mx-auto w-max text-white items-center">
      {links.map((link) => (
        <a class="rounded-full px-2 border" href={link.url} target="_blank">
          {link.title}
        </a>
      ))}
      <button class="rounded-full border font-mono px-2">+</button>
    </div>
  );
};
