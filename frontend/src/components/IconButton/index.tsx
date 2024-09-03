import { Icon,  IconProps } from "@phosphor-icons/react";
import { ButtonHTMLAttributes, FunctionComponent } from "react";
interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: Icon | "none";
  iconProps?: IconProps;
}
export const IconButton: FunctionComponent<IconButtonProps> = ({
  icon,
  iconProps,
  ...rest
}) => {
  const Icon = icon;
  return (
    <button
      className="group flex flex-row items-center justify-center p-[4px] aspect-square min-h-11 rounded-lg border border-transparent bg-transparent hover:bg-slate-500/30"
      {...rest}
    >
      {Icon !== "none" && <Icon className="transition-colors text-orange-500 group-hover:text-orange-600" {...iconProps} />}
    </button>
  );
};
