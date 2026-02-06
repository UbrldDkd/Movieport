// ContentPageBackdrop.jsx
export default function ContentPageBackdrop({ backdropUrl }) {
  return (
    <div className='relative w-[80%] mx-auto pointer-events-none z-0 -mb-'>
      <div
        className='w-full aspect-video bg-cover bg-center'
        style={{ backgroundImage: `url(${backdropUrl})` }}
      />
      <div className='absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-transparent pointer-events-none' />
      <div className='absolute inset-0 bg-gradient-to-l from-zinc-950 via-transparent to-transparent pointer-events-none' />
      <div className='absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none' />
    </div>
  );
}
