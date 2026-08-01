import { motion } from 'framer-motion';

export default function LightHouse() {
  return (
    <motion.div
      key='loading'
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className='w-full h-[85vh] flex items-center justify-center'
    >
      <motion.img
        src='/assets/lightHouseSm.gif'
        alt='Loading...'
        className='w-100 h-100'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </motion.div>
  );
}
