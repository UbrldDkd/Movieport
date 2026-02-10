export default function SearchButton({ onClick }) {
  return (
    <button
      type='button' // changed from submit to button for better control in single input scenarios
      aria-label='Search'
      onClick={onClick}
      className='cursor-pointer p-1.5 rounded-3xl hover:bg-red-900 transition-colors'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-5 w-5 text-white'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={2}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M21 21l-4.35-4.35m0 0a7 7 0 11-9.9-9.9 7 7 0 019.9 9.9z'
        />
      </svg>
    </button>
  );
}
