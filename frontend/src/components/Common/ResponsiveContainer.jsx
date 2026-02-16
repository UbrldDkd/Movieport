import { cn } from '../../utils/helpers/classNameUtils';

/**
 * Responsive container component
 * Handles responsive padding, spacing, and layout consistently across the app
 */
export default function ResponsiveContainer({
  children,
  className = '',
  spacing = 'default',
  maxWidth = 'max-w-7xl',
  type = 'section',
}) {
  const spacingMap = {
    default: 'px-3 md:px-6 lg:px-8 py-4 md:py-8 lg:py-12',
    tight: 'px-2 md:px-4 lg:px-6 py-2 md:py-4 lg:py-6',
    loose: 'px-4 md:px-8 lg:px-12 py-6 md:py-12 lg:py-16',
    none: '',
  };

  const typeMap = {
    section: 'w-full',
    card: 'rounded-lg border border-zinc-800',
    fullscreen: 'min-h-screen w-full',
  };

  return (
    <div
      className={cn(
        typeMap[type],
        spacingMap[spacing],
        maxWidth !== 'none' && 'mx-auto max-w-[360px]',
        className
      )}
    >
      {children}
    </div>
  );
}
