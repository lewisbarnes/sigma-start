import { useCallback, useContext, useMemo, useState } from 'preact/hooks';
import { Mode } from '../app';
import { nanoid } from 'nanoid';
import { QuickLink } from './QuickLink';
import { LinkState } from '../types/linkState';

export const QuickLinks = () => {
  const mode = useContext(Mode);
  const [modalVisible, setModalVisible] = useState(false);
  const id = useMemo(() => nanoid(), [modalVisible]);
  const [formState, setFormState] = useState<LinkState>({ id: id, title: '', url: '', order: 0 });
  const [links, setLinks] = useState<LinkState[]>([]);
  const [dbRequest, setDbRequest] = useState(window.indexedDB.open('SigmaStart', 1));

  const toggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, [modalVisible]);

  dbRequest.onerror = (event) => {
    console.error('GIVE ME MY ACCESS TO IndexedDB NOW!!!');
  };

  dbRequest.onsuccess = (event) => {
    // @ts-ignore
    const db = dbRequest.result;
    const transaction = db.transaction('quickLinks', 'readwrite');
    const store = transaction.objectStore('quickLinks');
    const cursorRequest = store.openCursor();
    let quickLinks: LinkState[] = [];
    cursorRequest.onsuccess = (ev) => {
      // @ts-ignore
      const cursor = ev.target.result!;
      if (cursor) {
        quickLinks.push(cursor.value);
        cursor.continue();
      } else {
        setLinks(quickLinks);
      }
    };
  };

  dbRequest.onupgradeneeded = () => {
    const db = dbRequest.result;
    const store = db.createObjectStore('quickLinks', { keyPath: 'id' });
    store.put({ id: nanoid(10), title: 'Google', url: 'https://www.google.com', order: 1 });
    store.put({
      id: nanoid(10),
      title: 'lewisbarnes',
      url: 'https://www.lewisbarnes.dev/',
      order: 0,
    });
  };

  const linkSubmit = () => {
    if (formState.title == '' || formState.url == '') {
      return;
    }
    const db = dbRequest.result;
    const transaction = db.transaction('quickLinks', 'readwrite');
    const store = transaction.objectStore('quickLinks');
    store.put(formState);
    transaction.commit();
    setLinks((prev) => [...prev, formState]);
    toggleModal();
  };

  const updateLink = (link: LinkState) => {
    const db = dbRequest.result;
    const transaction = db.transaction('quickLinks', 'readwrite');
    let store = transaction.objectStore('quickLinks');
    store.put(link);
    transaction.commit();
    setLinks((prev) => {
      let newArr = prev;
      newArr.splice(
        prev.findIndex((x) => x.id == link.id),
        1
      );
      return [...newArr, link];
    });
  };

  const deleteLink = (link: LinkState) => {
    const db = dbRequest.result;
    const transaction = db.transaction('quickLinks', 'readwrite');
    let store = transaction.objectStore('quickLinks');
    store.delete(link.id);
    transaction.commit();
    setLinks((prev) => {
      let newArr = prev;
      newArr.splice(
        prev.findIndex((x) => x.id == link.id),
        1
      );
      return [...newArr];
    });
  };

  return (
    <div class="flex gap-2 justify-center mx-auto w-max text-white items-center font-mono max-w-3xl flex-wrap">
      {links
        .sort((x) => x.order)
        .map((link) => (
          <QuickLink link={link} updateCallback={updateLink} deleteCallback={deleteLink} />
        ))}
      {mode == 'edit' && (
        <button
          class="rounded-md w-36 aspect-video flex items-center justify-center border border-dashed text-sm hover:scale-[120%] bg-black transition-transform duration-200"
          onClick={() => toggleModal()}
        >
          +
        </button>
      )}
      {modalVisible && (
        <div class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-40 flex">
          <div class="w-96 mx-auto my-auto bg-black border-2 z-50 opacity-100 rounded-md flex flex-col gap-2 p-2">
            <div class="flex justify-between items-center">
              <p class="text-xl">Add a new link</p>
              <button
                class="w-min  hover:invert bg-black text-white p-2 rounded-md"
                onClick={() => toggleModal()}
              >
                Close
              </button>
            </div>
            <div class="flex gap-2 justify-between items-center">
              <p>Title</p>
              <input
                type="text"
                value={formState.title}
                onChange={(e) =>
                  setFormState((prev) => {
                    return { id: prev.id, title: e.currentTarget.value, url: prev.url, order: 0 };
                  })
                }
                class="bg-transparent border-2 rounded-md"
              ></input>
            </div>
            <div class="flex gap-2 justify-between items-center">
              <p>URL</p>
              <input
                type="text"
                value={formState.url}
                onChange={(e) =>
                  setFormState((prev) => {
                    return { id: prev.id, title: prev.title, url: e.currentTarget.value, order: 0 };
                  })
                }
                class="bg-transparent border-2 rounded-md"
              ></input>
            </div>
            <div class="flex-grow"></div>
            <button
              class="w-min self-end  hover:invert bg-black text-white p-2 rounded-md"
              onClick={linkSubmit}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
