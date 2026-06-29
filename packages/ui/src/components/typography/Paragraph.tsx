"use client";

import {
  styled,
  Text as TamaguiText,
  type TextProps,
} from "tamagui";
import { forwardRef, type ReactNode } from "react";

export interface ParagraphProps extends Omit<TextProps, "size"> {
  size?: "sm" | "md" | "lg";
  indent?: boolean;
  lead?: boolean;
  children?: ReactNode;
}

const sizeConfig = {
  sm: { fontSize: 14, lineHeight: 24 },
  md: { fontSize: 16, lineHeight: 27 },
  lg: { fontSize: 18, lineHeight: 32 },
} as const;

const StyledParagraph = styled(TamaguiText, {
  name: "Paragraph",

  fontFamily: "$body",
  color: "$neutral700",
});

export const Paragraph = forwardRef<any, ParagraphProps>(
  ({ size = "md", indent = false, lead = false, children, style, ...props }, ref) => {
    const config = sizeConfig[size] ?? sizeConfig.md;

    const resolvedLineHeight = lead
      ? Math.round(config.lineHeight * 1.2)
      : config.lineHeight;

    return (
      <StyledParagraph
        ref={ref}
        {...props}
        style={{
          display: "block",

          fontSize: `${config.fontSize}px`,
          lineHeight: `${resolvedLineHeight}px`,

          color: "inherit",
          maxWidth: "100%",
          minWidth: 0,
          width: "100%",

          whiteSpace: "normal",
          overflow: "visible",
          overflowWrap: "break-word",
          wordBreak: "break-word",

          textIndent: indent ? "24px" : undefined,
          margin: 0,
          marginBottom: "16px",

          ...(style as any),
        }}
      >
        {children}
      </StyledParagraph>
    );
  }
);

Paragraph.displayName = "Paragraph";