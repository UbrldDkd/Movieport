import { motion as Motion } from 'framer-motion';
import { fadeInUpVariants } from '../../utils/style/animations/motionVariants';

export default function ContentContainer({ children, className }) {
  return (
    <Motion.div
      variants={fadeInUpVariants}
      initial='hidden'
      animate='visible'
      transition={{ duration: 0.1, ease: 'easeOut' }}
      className={`bg-bg-secondary   rounded-sm   h-full p-3 flex-col flex ${className}`}
    >
      {' '}
      {children}
    </Motion.div>
  );
}
