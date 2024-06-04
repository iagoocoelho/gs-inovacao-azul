import { FC } from "react";

type Props = {
  children: React.ReactNode;
};

export const Container: FC<Props> = ({ children }) => {
  return (
    <div className="flex bg-gray-200 px-2 py-3 justify-center min-h-full">
      <div className="max-w-[960px] w-full">{children}</div>
    </div>
  );
};
