import { useEffect } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';

export const SearchBar = () => {
  const search = (e: JSXInternal.TargetedKeyboardEvent<HTMLInputElement>) => {
    if (e.key != 'Enter') {
      return;
    }
    window.open(`https://duckduckgo.com/?q=${e.currentTarget.value}`, '_blank');
  };

  useEffect(() => {
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
      searchBar.focus();
    }
  }, []);

  return (
    <input
      id="search-bar"
      class="mx-auto w-[80%] block rounded-full px-4 py-2 bg-transparent border border-white placeholder:text-white text-white"
      onKeyPress={(e) => search(e)}
      placeholder="Search DuckDuckGo"
    />
  );
};
