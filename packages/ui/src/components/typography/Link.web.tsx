"use client";

import React, { forwardRef } from 'react';
import type { LinkProps } from './Link';

export const Link = forwardRef<any, LinkProps>(
  ({ children, href, onPress, isExternal, variant = 'inline', color = '#0070f3' }, ref) => {
    return (
      <a
        ref={ref}
        href={href || '#'}
        onClick={(e) => { if (onPress) { e.preventDefault(); onPress(); } }}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        style={{
          color,
          textDecoration: 'underline',
          cursor: 'pointer',
          fontWeight: variant === 'standalone' ? 600 : 400,
          fontSize: variant === 'standalone' ? '16px' : 'inherit',
        }}
      >
        {children}{isExternal && ' ↗'}
      </a>
    );
  }
);
Link.displayName = 'LumaLink';
