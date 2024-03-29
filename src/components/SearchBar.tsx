import { useEffect } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';

const urlRegEx =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

export const SearchBar = () => {
  const ddgURL = `https://duckduckgo.com/?q=`;

  const search = (e: JSXInternal.TargetedKeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value == '' || e.key != 'Enter') {
      return;
    }
    if (urlRegEx.test(e.currentTarget.value)) {
      window.open(
        e.currentTarget.value.startsWith('http://') || e.currentTarget.value.startsWith('https://')
          ? e.currentTarget.value
          : 'http://' + e.currentTarget.value,
        '_blank'
      );
    } else {
      window.open(`${ddgURL}${e.currentTarget.value}`, '_blank');
    }
  };

  useEffect(() => {
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
      searchBar.focus();
    }
  }, []);

  return (
    <div>
      <input
        id="search-bar"
        class="bg-black/60 mx-auto w-[80vw] block rounded-full px-4 py-2 border border-zinc-500 placeholder:text-white text-white outline-none"
        onKeyPress={(e) => search(e)}
        placeholder="Search DuckDuckGo"
      />
    </div>
  );
};
