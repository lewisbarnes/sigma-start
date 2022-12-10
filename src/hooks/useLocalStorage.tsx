import { useState } from 'preact/hooks';

export const useLocalStorage = <T,>(
  itemKey: string
): { data: T | null; setStorageValue: (value: T) => void } => {
  const item = localStorage.getItem(itemKey);
  const [itemState, setItemState] = useState<T | null>(null);

  const setStorageValue = (value: T) => {
    localStorage.setItem(itemKey, JSON.stringify(value));
    setItemState(value);
  };

  if (!item) {
    return {
      data: null,
      setStorageValue,
    };
  }

  setItemState(JSON.parse(item) as T);

  return { data: itemState, setStorageValue };
};
