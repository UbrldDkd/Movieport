// ContentPageBackdrop.jsx
export default function ContentPageBackdrop({ backdropUrl }) {
  return (
    <div className='relative w-full mx-auto pointer-events-none z-0 -mb-10'>
      <div
        className='w-full aspect-4/3 md:aspect-video sm:aspect-video  bg-cover bg-center'
        style={{ backgroundImage: `url(${backdropUrl})` }}
      />
      <div className='absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-transparent pointer-events-none' />
      <div className='absolute inset-0 bg-gradient-to-l from-zinc-950 via-transparent to-transparent pointer-events-none' />
      <div className='absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none' />
    </div>
  );
}
