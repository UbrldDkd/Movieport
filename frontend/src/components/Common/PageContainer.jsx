import { motion } from 'framer-motion';
import { containerVariantsStagger } from '../../utils/animations/motionVariants';

export default function PageContainer({ children }) {
  return (
    <motion.div
      className='min-h-screen bg-zinc-950 text-zinc-200'
      initial='hidden'
      animate='visible'
      variants={containerVariantsStagger}
    >
      <div className='mx-auto w-full max-w-[1120px] px-4 sm:px-6 md:px-8 lg:px-12 pb-8 flex flex-col'>
        {children}
      </div>
    </motion.div>
  );
}
