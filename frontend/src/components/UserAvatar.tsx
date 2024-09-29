import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
}

const UserAvatar = (props: Props) => {
  return (
    <div
      className={cn(
        "flex aspect-square h-full items-center justify-center rounded-full bg-secondary text-xl font-medium text-white",
        props.className,
      )}
    >
      {props.name.charAt(0)}
    </div>
  );
};

export default UserAvatar;
