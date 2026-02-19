export default function ContentContainer({ children }) {
  return (
    <div className='bg-zinc-900/60  gap-3 md:gap-10 rounded-sm min-h-screen  p-3 flex-col flex'>
      {children}
    </div>
  );
}
