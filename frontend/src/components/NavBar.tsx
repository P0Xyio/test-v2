import { Link } from "@tanstack/react-router";
import Icon, { IconProps } from "./Icon";

interface NavBarItemProps {
  label: string;
  icon: IconProps;
}

const NavBarItem = (props: NavBarItemProps) => {
  return (
    <div className="flex flex-col items-center">
      <Icon {...props.icon} />
      <span>{props.label}</span>
    </div>
  );
};

const NavBar = () => {
  return (
    <nav className="flex justify-between px-4 py-2 md:mt-4">
      <Link to="/">
        <NavBarItem label="Home" icon={{ name: "house" }} />
      </Link>
      <Link to="/login">
        <NavBarItem label="Account" icon={{ name: "user-round" }} />
      </Link>
    </nav>
  );
};

export default NavBar;
