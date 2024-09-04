import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ReactNode } from "react";

interface CustomPopoverProps {
  triggerText?: string;
  triggerClassName?: string;
  icon?: ReactNode;
  children: (closePopover: () => void) => ReactNode;
}

export const CustomPopover: React.FC<CustomPopoverProps> = ({
  triggerText,
  triggerClassName,
  icon,
  children,
}) => {
  return (
    <Popover>
      <PopoverTrigger className={`${triggerClassName}`}>
        <div>{icon}</div>
        {triggerText}
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 bg-slate-600 border-0 text-slate-100">
        {children(() => {
          const popover = document.querySelector('[data-state="open"]');
          if (popover) {
            popover.dispatchEvent(new Event("click", { bubbles: true }));
          }
        })}
      </PopoverContent>
    </Popover>
  );
};
