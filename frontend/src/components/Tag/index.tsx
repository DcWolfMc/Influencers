import { FunctionComponent } from "react";

interface TagProps {
  name: string;
}
export const Tag: FunctionComponent<TagProps> = ({ name }) => {
  return (
    <span className="px-3 py-1 border border-slate-400 capitalize rounded-xl text-center">
      {name}
    </span>
  );
};
