import { forwardRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, type InputProps } from "@/components/ui/input";
import Icon from "./Icon";

// this component uses "Icon wrapper" which causes gray box to appear for a split second when toggling visibility
// would be better to directly import icons

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={className}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="hover absolute right-0 top-0 h-full hover:bg-transparent hover:text-text/50"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          <Icon
            name={showPassword === true ? "eye-off" : "eye"}
            className="h-4 w-4 text-accent"
          />
        </Button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
