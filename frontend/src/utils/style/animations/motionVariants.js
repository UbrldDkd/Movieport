// ── Page & layout ──────────────────────────────────────────────────

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  exit: { opacity: 0, y: -12 },
};

export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0 },
};

export const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  exit: { opacity: 0, y: -12 },
};

export const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
};

export const revealVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  exit: { opacity: 0, scale: 0.98 },
};

// ── Lists & stagger ────────────────────────────────────────────────

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, ease: 'easeOut' },
  },
  exit: { opacity: 0 },
};

export const containerVariantsStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, ease: 'easeOut' },
  },
  exit: { opacity: 0 },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10 },
};

// ── Tabs ───────────────────────────────────────────────────────────

export const tabVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10 },
};

// ── Tooltip ────────────────────────────────────────────────────────

export const tooltipVariants = {
  initial: { opacity: 0, y: -6, scale: 0.97 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.15, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.97,
    transition: { duration: 0.1, ease: 'easeIn' },
  },
};

// ── Skeleton / loading ─────────────────────────────────────────────

// Fade out the skeleton overlay
export const skeletonExitVariants = {
  initial: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Fade in content after skeleton
export const skeletonRevealVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Staggered skeleton rows
export const skeletonContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, ease: 'easeOut' },
  },
  exit: { opacity: 0 },
};

export const skeletonItemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
};

// Pulse a single skeleton block
export const skeletonPulseVariants = {
  loading: {
    opacity: [0.4, 0.8, 0.4],
    transition: { duration: 1.6, ease: 'easeInOut', repeat: Infinity },
  },
};

// Shimmer sweep — use with a gradient background
export const shimmerVariants = {
  loading: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: { duration: 1.8, ease: 'linear', repeat: Infinity },
  },
};

// ── Spinners & dots ────────────────────────────────────────────────

export const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: { duration: 0.8, ease: 'linear', repeat: Infinity },
  },
};

export const dotContainerVariants = {
  animate: { transition: { staggerChildren: 0.18 } },
};

export const dotVariants = {
  animate: {
    y: [0, -5, 0],
    opacity: [0.4, 1, 0.4],
    transition: { duration: 0.7, ease: 'easeInOut', repeat: Infinity },
  },
};

// ── Overlay ────────────────────────────────────────────────────────

export const loaderOverlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
};
