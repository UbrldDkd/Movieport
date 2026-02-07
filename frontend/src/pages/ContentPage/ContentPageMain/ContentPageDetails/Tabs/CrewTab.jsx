// tabs/CrewTab.jsx
export default function CrewTab({ crew, isLoading }) {
  if (isLoading) {
    return (
      <div className='space-y-4 animate-pulse'>
        {[...Array(4)].map((_, i) => (
          <div key={i} className='h-12 bg-zinc-800/50 rounded-sm' />
        ))}
      </div>
    );
  }

  if (!Object.keys(crew).length) {
    return (
      <div className='text-zinc-500 text-sm py-4'>
        No crew information available
      </div>
    );
  }
  console.log(crew);

  return (
    <div className='space-y-5'>
      {Object.entries(crew).map(([department, members]) => (
        <div key={department}>
          <h3 className='text-zinc-200 font-semibold tracking-wider uppercase text-xs border-b border-zinc-800 pb-2'>
            {department}
          </h3>
          <div>
            {members.map((member, index) => (
              <div
                key={index}
                className='flex items-center gap-3 py-1.5 px-2 hover:bg-zinc-900/30 rounded-sm transition-colors group'
              >
                <span className='text-zinc-200 font-semibold text-sm tracking-wide'>
                  {member.name}
                </span>
                <span className='text-zinc-600 text-xs font-medium'>—</span>
                <span className='text-zinc-400 text-sm truncate flex-1'>
                  {member.job}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
