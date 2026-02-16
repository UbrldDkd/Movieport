/**
 * Utility functions for managing Tailwind className combinations
 * Prevents bloated inline classNames in components
 */

export const responsive = {
  // Responsive spacing
  container: 'px-3 md:px-6 lg:px-8',
  containerTight: 'px-2 md:px-4 lg:px-6',
  section: 'py-4 md:py-8 lg:py-12',
  sectionTight: 'py-2 md:py-4 lg:py-6',

  // Responsive text
  heading: 'text-xl md:text-2xl lg:text-3xl',
  subheading: 'text-lg md:text-xl lg:text-2xl',
  bodyText: 'text-sm md:text-base lg:text-lg',
  smallText: 'text-xs md:text-sm lg:text-base',

  // Responsive gaps
  gapDefault: 'gap-2 md:gap-4 lg:gap-6',
  gapTight: 'gap-1 md:gap-2 lg:gap-3',
  gapLoose: 'gap-4 md:gap-6 lg:gap-8',

  // Grid layouts
  gridAuto: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  gridDense: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
};

export const states = {
  hoverTransition: 'transition-all duration-300 ease-out',
  focusRing:
    'focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-zinc-950',
  disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
};

export const buttons = {
  primary:
    'px-4 py-2 md:px-5 md:py-2.5 bg-red-950 text-white rounded-md font-semibold hover:bg-red-900 transition-colors',
  secondary:
    'px-4 py-2 md:px-5 md:py-2.5 bg-zinc-800 text-zinc-300 rounded-md font-semibold hover:bg-zinc-700 transition-colors',
  ghost:
    'px-3 py-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded-md transition-colors',
};

export const cards = {
  default:
    'bg-zinc-900/90 rounded-lg p-4 md:p-6 text-white border border-zinc-800',
  compact:
    'bg-zinc-900/80 rounded-md p-2 md:p-3 text-zinc-300 border border-zinc-800/50',
};

/**
 * Combines multiple className objects into single string
 * @param {...string|object} classes - Classes to combine
 * @returns {string}
 */
export const cn = (...classes) => {
  return classes.flat().filter(Boolean).join(' ');
};
