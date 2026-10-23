import type { AnchorHTMLAttributes } from 'react';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** Link to another site: opens in a new tab and tells screen-reader users so. */
export function ExternalLink({ children, ...props }: Props) {
  return (
    <a target="_blank" rel="noopener" {...props}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
