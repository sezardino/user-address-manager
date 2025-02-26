import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/utils/shadcn-ui";
import {
  ComponentPropsWithRef,
  ForwardRefRenderFunction,
  forwardRef,
} from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export type TypographyLevel =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "dt"
  | "dd";
type TypographyWeight = "thin" | "light" | "normal" | "medium" | "bold";

const weightMap: Record<TypographyWeight, string> = {
  thin: "font-thin",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  bold: "font-bold",
};

type Props = {
  level?: TypographyLevel;
  asChild?: boolean;
  weight?: TypographyWeight;
  isUnderlined?: boolean;
  isUppercase?: boolean;
};

export type TypographyProps = ComponentPropsWithRef<"p"> & Props;

const TypographyComponent: ForwardRefRenderFunction<
  HTMLParagraphElement,
  TypographyProps
> = (props, ref) => {
  const {
    level,
    weight = "normal",
    asChild = false,
    isUppercase = false,
    isUnderlined,
    className,
    children,
    ...rest
  } = props;

  const Comp = level ? level : asChild ? Slot : "p";

  return (
    <Comp
      {...rest}
      ref={ref}
      className={cn(
        weightMap[weight],
        isUnderlined && "underline",
        isUppercase && "uppercase",
        className
      )}
    >
      {children}
    </Comp>
  );
};

export const Typography = forwardRef(TypographyComponent);

export interface TruncatedTypographyProps
  extends Omit<TypographyProps, "children"> {
  ellipsisLength?: number;
  text?: string;
}

export const TruncatedTypography = (props: TruncatedTypographyProps) => {
  const { text = "", ellipsisLength = 24, className, ...rest } = props;

  if (text?.length > ellipsisLength)
    return (
      <Tooltip>
        <TooltipTrigger asChild className="text-left cursor-pointer">
          <Typography
            {...rest}
            className={cn("line-clamp-1 select-none", className)}
          >{`${text.slice(0, ellipsisLength).trim()}...`}</Typography>
        </TooltipTrigger>
        <TooltipContent asChild>
          <Typography {...rest}>{text}</Typography>
        </TooltipContent>
      </Tooltip>
    );

  return (
    <Typography {...rest} className={cn("line-clamp-1 select-none", className)}>
      {text}
    </Typography>
  );
};
