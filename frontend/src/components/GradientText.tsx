import { PropsWithChildren } from "react";

const GradientText = ({ children }: PropsWithChildren) => (
  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
    {children}
  </span>
);

export default GradientText;
