 export default function SearchButton({onClick}) {
  
  

 // later use for a full search bar

  return (  
  <button
    type="submit"
    aria-label="Search"
    onClick={onClick}
    className='cursor-pointer'
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35m0 0a7 7 0 11-9.9-9.9 7 7 0 019.9 9.9z"
      />
    </svg>
  </button>
 
    );
}