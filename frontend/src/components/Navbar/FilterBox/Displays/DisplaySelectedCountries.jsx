export default function DisplaySelectedCountries({ selectedCountries }) {
  if (selectedCountries?.length === 0 || !selectedCountries) {
    return (
      <p className='col-span-3 pt-3 text-sm text-gray-600'>
        Selected Countries: None
      </p>
    );
  }

  return (
    <div className='col-span-3 pt-3 text-sm text-gray-600 flex flex-wrap gap-1'>
      <span className='mr-1 text-zinc-400 font-semibold'>
        Selected Countries:
      </span>

      {/* Map through selected countries and display their names */}
      {selectedCountries.map((c) => (
        <span
          key={c.code}
          className='bg-zinc-800 text-zinc-300 cursor-pointer rounded px-2 py-1 text-xs whitespace-normal'
        >
          {c.name}
        </span>
      ))}
    </div>
  );
}
