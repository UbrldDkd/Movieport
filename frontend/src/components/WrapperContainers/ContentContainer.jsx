import { motion as Motion } from 'framer-motion';
import { fadeInUpVariants } from '../../utils/style/animations/motionVariants';

export default function ContentContainer({ children }) {
  return (
    <Motion.div
      variants={fadeInUpVariants}
      initial='hidden'
      animate='visible'
      transition={{ duration: 0.1, ease: 'easeOut' }}
      className='bg-bg-primary  gap-3 md:gap-10 rounded-sm min-h-screen  p-3 flex-col flex'
    >
      {' '}
      {children}
    </Motion.div>
  );
}
