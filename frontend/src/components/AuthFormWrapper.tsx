import { PropsWithChildren } from "react";

const AuthFormWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="mt-4 flex w-full flex-col items-center px-4">
      <div className="flex w-full max-w-96 flex-col gap-4 space-y-2">
        {children}
      </div>
    </div>
  );
};

export default AuthFormWrapper;
