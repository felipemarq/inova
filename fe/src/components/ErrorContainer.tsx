import { X } from "lucide-react";

interface ErrorContainerProps {
  error: string;
}

export const ErrorContainer = ({ error }: ErrorContainerProps) => {
  return (
    <div className="flex gap-2 items-center mt-2 p-[2px] rounded-md text-white font-semibold bg-redAccent-500 w-full ">
      <X />
      <span className="text-xs">{error}</span>
    </div>
  );
};
