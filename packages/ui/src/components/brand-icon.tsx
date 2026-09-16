import { cn } from "@reactive-resume/utils/style";

type Props = React.ComponentProps<"img"> & {
  variant?: "logo" | "icon";
};

export function BrandIcon({ variant = "logo", className, ...props }: Props) {
  // Use the new GLH PNG logos for the full logo.
  // Keep the original icon SVGs temporarily for small icon placements.
  if (variant === "logo") {
    return (
      <>
        <img
          src="/logo/glh-dark.png"
          alt="GLH CV"
          className={cn("hidden size-12 dark:block object-contain", className)}
          {...props}
        />
        <img
          src="/logo/glh-light.png"
          alt="GLH CV"
          className={cn("block size-12 dark:hidden object-contain", className)}
          {...props}
        />
      </>
    );
  }

  return (
    <>
      <img
        src="/icon/dark.svg"
        alt="GLH CV"
        className={cn("hidden size-12 dark:block", className)}
        {...props}
      />
      <img
        src="/icon/light.svg"
        alt="GLH CV"
        className={cn("block size-12 dark:hidden", className)}
        {...props}
      />
    </>
  );
}