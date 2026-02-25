import { motion } from 'framer-motion';
import { containerVariantsStagger } from '../../utils/style/animations/motionVariants';

export default function BackgroundContainer({ children }) {
  return (
    <motion.div
      className='min-h-screen  bg-zinc-950 text-zinc-200'
      initial='hidden'
      animate='visible'
      variants={containerVariantsStagger}
    >
      <div className='mx-auto w-full pt-2 max-w-[1120px] px-2  mt-1.75 pb-8 flex flex-col'>
        {children}
      </div>
    </motion.div>
  );
}
