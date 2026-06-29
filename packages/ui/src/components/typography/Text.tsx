"use client";

import {
  styled,
  Text as TamaguiText,
  type TextProps as TamaguiTextProps,
} from "tamagui";
import { forwardRef, type ReactNode } from "react";

export interface TextComponentProps extends Omit<TamaguiTextProps, "size"> {
  variant?: "body" | "caption" | "label" | "quote";
  size?: number;
  weight?: "300" | "400" | "500" | "600" | "700";
  color?: string;
  align?: "left" | "center" | "right" | "justify";
  numberOfLines?: number;
  children?: ReactNode;
}

export type { TextComponentProps as TextProps };

const DEFAULT_FONT_SIZE = 16;

const getFontSizeForVariant = (variant: TextComponentProps["variant"]) => {
  switch (variant) {
    case "caption":
      return 14;
    case "label":
      return 12;
    case "quote":
      return 18;
    case "body":
    default:
      return 16;
  }
};

const getLineHeight = (fontSize: number) => {
  return Math.round(fontSize * 1.5);
};

const normalizeLineHeight = (lineHeight: unknown, fontSize: number) => {
  if (typeof lineHeight !== "number") return lineHeight;

  // Converts ratios like 1, 1.5, 1.8, 2 into pixel values.
  if (lineHeight <= 3) {
    return Math.round(fontSize * lineHeight);
  }

  // Already a pixel value.
  return lineHeight;
};

const normalizeStyle = (style: any, fontSize: number): any => {
  if (!style) return undefined;

  if (Array.isArray(style)) {
    return style.map((item) => normalizeStyle(item, fontSize));
  }

  if (typeof style === "object") {
    return {
      ...style,
      lineHeight: normalizeLineHeight(style.lineHeight, fontSize),
    };
  }

  return style;
};

const StyledText = styled(TamaguiText, {
  name: "Text",

  display: "block" as any,
  fontFamily: "$body",
  color: "$neutral700",
  fontSize: DEFAULT_FONT_SIZE,
  lineHeight: getLineHeight(DEFAULT_FONT_SIZE),

  minWidth: 0,
  maxWidth: "100%",
  flexShrink: 1,

  variants: {
    variant: {
      body: {
        fontSize: 16,
        lineHeight: 24,
        color: "$neutral700",
      },

      caption: {
        fontSize: 14,
        lineHeight: 21,
        color: "$neutral500",
      },

      label: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "500",
        letterSpacing: 0.5,
        textTransform: "uppercase",
        color: "$neutral600",
      },

      quote: {
        fontFamily: "$heading",
        fontStyle: "italic",
        fontSize: 18,
        lineHeight: 27,
        color: "$neutral600",
        borderLeftWidth: 2,
        borderLeftColor: "$primary400",
        paddingLeft: 20,
      },
    },
  } as const,

  defaultVariants: {
    variant: "body",
  },
});

export const Text = forwardRef<any, TextComponentProps>(
  (
    {
      variant = "body",
      size,
      weight,
      color,
      align,
      numberOfLines,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const resolvedFontSize = size ?? getFontSizeForVariant(variant);
    const resolvedLineHeight = getLineHeight(resolvedFontSize);
    const normalizedStyle = normalizeStyle(style, resolvedFontSize);

    return (
      <StyledText
        ref={ref}
        variant={variant}
        fontSize={resolvedFontSize}
        lineHeight={resolvedLineHeight}
        fontWeight={weight as any}
        color={color as any}
        textAlign={align}
        numberOfLines={numberOfLines}
        {...props}
        style={{
          display: "block",
          minWidth: 0,
          maxWidth: "100%",
          flexShrink: 1,

          whiteSpace: numberOfLines === 1 ? "nowrap" : "normal",
          overflow: numberOfLines ? "hidden" : "visible",
          textOverflow: numberOfLines === 1 ? "ellipsis" : undefined,
          overflowWrap: "break-word",
          wordBreak: "break-word",

          ...normalizedStyle,
        }}
      >
        {children}
      </StyledText>
    );
  }
);

Text.displayName = "Text";