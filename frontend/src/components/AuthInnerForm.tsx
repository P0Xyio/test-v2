import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { Button } from "./ui/button";

interface AuthInnerFormProps
  extends PropsWithChildren<React.HTMLAttributes<HTMLFormElement>> {
  btnDisabled: boolean;
  btnText: string;
  serverError?: string | undefined;
}

const AuthInnerForm = (props: AuthInnerFormProps) => {
  return (
    <form
      onSubmit={props.onSubmit}
      className={cn("flex w-full flex-col gap-2 md:gap-4", props.className)}
    >
      {props.children}

      {props.serverError && (
        <div className="text-red-500">{props.serverError}</div>
      )}

      <Button
        type="submit"
        className="mt-4 w-full md:mt-8"
        disabled={props.btnDisabled}
      >
        {props.btnText}
      </Button>
    </form>
  );
};

export default AuthInnerForm;
