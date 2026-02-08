import { GoDash } from 'react-icons/go';

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

  const crewByJob = {};
  Object.entries(crew).forEach(([department, members]) => {
    members.forEach((member) => {
      if (!crewByJob[member.job]) {
        crewByJob[member.job] = [];
      }
      crewByJob[member.job].push(member.name);
    });
  });

  const pluralize = (job, count) => {
    if (count <= 1) return job;
    if (job.endsWith('y')) return job.slice(0, -1) + 'ies';
    if (
      job.endsWith('s') ||
      job.endsWith('x') ||
      job.endsWith('ch') ||
      job.endsWith('sh')
    )
      return job + 'es';
    return job + 's';
  };

  return (
    <div className='space-y-1'>
      {Object.entries(crewByJob).map(([job, names]) => (
        <div
          key={job}
          className='flex items-start gap-3 py-2 px-2 rounded-sm transition-colors'
        >
          <span className='text-zinc-300/60 font-semibold items-baseline gap-2 flex text-sm tracking-wide min-w-[140px] md:min-w-[180px] flex-shrink-0'>
            {pluralize(job, names.length)}
            <span className='flex-1 border-b-1 h-2 border-zinc-500 border-dotted self-center' />
          </span>
          <div className='flex-1 space-y-0.5'>
            {names.map((name, index) => (
              <div
                key={index}
                className='text-zinc-300/90 hover:bg-zinc-900 bg-zinc-900/50 transition-colors duration-100 px-2 py-1 rounded-sm hover:cursor-pointer font-semibold text-sm tracking-wide'
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
