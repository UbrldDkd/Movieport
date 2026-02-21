export default function DisplaySelectedYears({ selectedYears }) {
  if (selectedYears?.length === 0 || !selectedYears) {
    return (
      <p className='col-span-3 pt-3 text-sm text-gray-600'>
        Selected Years: None
      </p>
    );
  }

  return (
    <div className='col-span-3 pt-3 text-sm text-gray-600 flex flex-wrap gap-1'>
      <span className='mr-1 text-zinc-400 font-semibold'>Selected Years:</span>

      {/* Map through selected genre IDs and display their names */}
      {selectedYears.map((id) => (
        <span
          key={id}
          className='bg-zinc-800 text-text-primary cursor-pointer rounded px-2 py-1 text-xs whitespace-normal'
        >
          {id}
        </span>
      ))}
    </div>
  );
}
