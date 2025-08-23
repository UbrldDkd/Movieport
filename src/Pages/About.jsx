export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-zinc-300">
      <h1 className="text-3xl font-bold mb-4 text-white">About This Project</h1>

      <p className="mb-4">
        This web app allows users to explore detailed information about movies and TV shows, including cast, trailers, ratings, and streaming availability.
      </p>

      <p className="mb-4">
        The app is powered by data from the <a href="https://www.omdbapi.com/" className="text-blue-400 underline" target="_blank">OMDb API</a> and <a href="https://www.themoviedb.org/" className="text-blue-400 underline" target="_blank">TMDb API</a>, providing up-to-date information on thousands of titles.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-white">Features</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Search for movies and TV shows by title</li>
        <li>View trailers, descriptions, release dates, and genres</li>
        <li>Check streaming availability on popular platforms</li>
        <li>Browse ratings and related titles</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-white">Disclaimer</h2>
      <p className="mb-4">
        This site is a personal project and is not affiliated with any streaming service. All data belongs to its respective copyright owners.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-white">Contact</h2>
      <p>
        Have feedback or suggestions? Feel free to reach out via the <a href="/contact" className="text-blue-400 underline">contact page</a>.
      </p>
    </div>
  )
}
