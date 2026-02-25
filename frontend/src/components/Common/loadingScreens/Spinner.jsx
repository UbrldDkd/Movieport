import { useState, useEffect } from 'react';

export default function Spinner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    return () => setVisible(false);
  }, []);

  return (
    <div
      className='flex h-[85vh] w-full items-center justify-center transition-opacity duration-300'
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className='h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-red-900' />
    </div>
  );
}
