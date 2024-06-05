import { FC } from "react";

type Props = {
  children: React.ReactNode;
};

export const Container: FC<Props> = ({ children }) => {
  return (
    <div className="flex justify-center min-h-[80vh] p-12 m-8 rounded-2xl backdrop-blur-md backdrop-brightness-75">
      <div className="max-w-[960px] w-full rounded">
        {children}
      </div>
    </div>
  );
};
