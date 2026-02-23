import { motion as Motion, AnimatePresence } from 'framer-motion';
import { tabVariants } from '../../utils/style/animations/motionVariants';

export default function TabsContainers({ activeTab, children }) {
  return (
    <AnimatePresence mode='wait'>
      <Motion.div
        key={activeTab}
        variants={tabVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className=' '
      >
        {children}
      </Motion.div>
    </AnimatePresence>
  );
}
