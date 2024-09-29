import { lazy, memo, Suspense } from "react";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

// decided to use this "Icon" component, as I find it more elegant way to pass icons to children components
// downside it that it builds all the icons, even if they are not used

const fallback = <div style={{ background: "#ddd", width: 24, height: 24 }} />;

export interface IconProps extends Omit<LucideProps, "ref"> {
  name: keyof typeof dynamicIconImports;
}

const Icon = memo(({ name, ...props }: IconProps) => {
  if (!dynamicIconImports[name]) {
    console.error(`Icon "${name}" not found.`);
    return fallback;
  }

  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  );
});

export default Icon;
