import { useCallback, useContext, useState } from 'preact/hooks';
import { Mode } from '../app';
import { LinkState } from '../types/linkState';

export const QuickLink = (props: {
  link: LinkState;
  updateCallback: Function;
  deleteCallback: Function;
}) => {
  const mode = useContext(Mode);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, [modalVisible]);

  const [state, setState] = useState<LinkState>(props.link);

  const linkSubmit = () => {
    if (state.title == '' || state.url == '') {
      return;
    }
    toggleModal();
    props.updateCallback(state);
  };

  return (
    <div>
      {mode == 'edit' ? (
        <button
          class="rounded-md w-36 p-2 aspect-video flex flex-col items-center justify-center border text-sm hover:scale-[120%] bg-black transition-transform duration-200"
          onClick={() => toggleModal()}
        >
          <p class="break-all">{state.title}</p>
        </button>
      ) : (
        <a
          class="rounded-md w-36 p-2 aspect-video flex flex-col items-center justify-center border text-sm hover:scale-[120%] bg-black transition-transform duration-200"
          href={state.url}
          target="_blank"
        >
          <p class="break-all">{state.title}</p>
        </a>
      )}
      {modalVisible && (
        <div class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-40 flex">
          <div class="w-96 mx-auto my-auto bg-black border-2 z-50 opacity-100 rounded-md flex flex-col gap-2 p-2">
            <div class="flex justify-between items-center">
              <p class="text-xl">Edit Link</p>
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
                value={state.title}
                onChange={(e) =>
                  setState((prev) => {
                    return {
                      id: prev.id,
                      title: e.currentTarget.value,
                      url: prev.url,
                      order: prev.order,
                    };
                  })
                }
                class="bg-transparent border-2 rounded-md"
              ></input>
            </div>
            <div class="flex gap-2 justify-between items-center">
              <p>URL</p>
              <input
                type="text"
                value={state.url}
                onChange={(e) =>
                  setState((prev) => {
                    return {
                      id: prev.id,
                      title: prev.title,
                      url: e.currentTarget.value,
                      order: prev.order,
                    };
                  })
                }
                class="bg-transparent border-2 rounded-md"
              ></input>
            </div>
            <div class="flex-grow"></div>
            <div class="flex justify-between flex-row-reverse">
              <button
                class="w-min self-end  hover:invert bg-black text-white p-2 rounded-md"
                onClick={linkSubmit}
              >
                Save
              </button>
              <button
                class="w-min self-end  hover:bg-red-600 bg-red-500 text-white p-2 rounded-md"
                onClick={() => {
                  props.deleteCallback(state);
                  toggleModal();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
