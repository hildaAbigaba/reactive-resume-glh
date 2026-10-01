import { cn } from "@reactive-resume/utils/style";

type Props = React.ComponentProps<"img"> & {
	variant?: "logo" | "icon";
};

export function BrandIcon({ variant = "logo", className, ...props }: Props) {
	if (variant === "icon") {
		return (
			<>
				{/* Light application mode */}
				<img
					src="/icon/glh-dark.svg"
					alt="GLH"
					className={cn("block size-12 object-contain dark:hidden", className)}
					{...props}
				/>

				{/* Dark application mode */}
				<img
					src="/icon/glh-light.svg"
					alt="GLH"
					className={cn("hidden size-12 object-contain dark:block", className)}
					{...props}
				/>
			</>
		);
	}

	return (
		<>
			<img src="/logo/dark.svg" alt="GLH CV" className={cn("hidden size-12 dark:block", className)} {...props} />

			<img src="/logo/light.svg" alt="GLH CV" className={cn("block size-12 dark:hidden", className)} {...props} />
		</>
	);
}
