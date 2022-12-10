import { JSXInternal } from 'preact/src/jsx';

type Props = {
  children: JSXInternal.Element[];
};

export const LinkList = (props: Props) => {
  return (
    <div class="bg-black/60 border w-96 rounded-md mx-auto text-white p-4">
      {props.children.map((x) => (
        <>{x}</>
      ))}
    </div>
  );
};
