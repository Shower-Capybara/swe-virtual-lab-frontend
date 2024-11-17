import React, { DetailedHTMLProps, HTMLAttributes } from "react";

interface AppButtonProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    "onClick"
  > {
  onClick: () => void;
  text: string;
}

const AppButton: React.FC<AppButtonProps> = ({ onClick, text, ...props }) => {
  return (
    <button
      onClick={onClick}
      className="bg-black text-white py-2 px-4 w-full border border-black hover:bg-white  hover:text-black transition-all outline-none ring-0 text-nowrap"
      {...props}
    >
      {text}
    </button>
  );
};

export default AppButton;
