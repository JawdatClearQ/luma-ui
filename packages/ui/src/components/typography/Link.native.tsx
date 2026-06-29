"use client";

import React, { forwardRef } from 'react';
import { Text, styled } from 'tamagui';
import { Linking } from 'react-native';
import type { LinkProps } from './Link';

const StyledText = styled(Text, {
  name: 'LumaLink',
  variants: {
    variant: {
      inline: { color: '$blue10', textDecorationLine: 'underline' },
      standalone: { color: '$blue10', fontWeight: '600', fontSize: '$md' },
    },
  } as const,
  defaultVariants: { variant: 'inline' },
});

export const Link = forwardRef<any, LinkProps>(
  ({ children, href, onPress, isExternal, variant = 'inline' }, ref) => {
    const handlePress = () => {
      if (onPress) onPress();
      else if (href) Linking.openURL(href);
    };
    return (
      <StyledText ref={ref} variant={variant} onPress={handlePress} accessibilityRole="link">
        {children}{isExternal && ' ↗'}
      </StyledText>
    );
  }
);
Link.displayName = 'LumaLink';
