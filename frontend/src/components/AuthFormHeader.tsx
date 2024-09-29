interface AuthFormHeaderProps {
  title: string;
  subtitle: string;
}

const AuthFormHeader = (props: AuthFormHeaderProps) => {
  return (
    <div>
      <h1 className="text-2xl font-medium">{props.title}</h1>
      <p>{props.subtitle}</p>
    </div>
  );
};

export default AuthFormHeader;
