import React from "react";
import { Link } from "@tanstack/react-router";

interface AuthLinkProps {
  to: string;
  children: React.ReactNode;
}

const AuthLink = ({ to, children }: AuthLinkProps) => {
  return (
    <Link
      to={to}
      className="underscore text-accent inline-flex items-center space-x-1 hover:underline"
    >
      {children}
    </Link>
  );
};

export default AuthLink;
