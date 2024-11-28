"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex justify-center items-center gap-2 dark:hover:bg-neutral-800 dark:data-[state=on]:bg-neutral-800 data-[state=on]:bg-brown disabled:opacity-50 rounded-[4px] focus-visible:ring-2 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300 ring-offset-white focus-visible:ring-offset-2 dark:ring-offset-neutral-950 font-medium text-sm dark:hover:text-neutral-400 dark:data-[state=on]:text-neutral-50 data-[state=on]:text-white transition-colors focus-visible:outline-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 data-[state=on]:after:bg-[url('/close.svg')] data-[state=on]:after:w-5 data-[state=on]:after:h-5",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-brown bg-transparent text-brown hover:bg-beige-light dark:border-neutral-800 dark:hover:bg-neutral-800 ",
      },
      size: {
        default: "px-2 py-1 min-w-max",
        sm: "h-9 px-2.5 min-w-9",
        lg: "h-11 px-5 min-w-11",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
