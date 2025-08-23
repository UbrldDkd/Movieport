export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10 text-zinc-300">
      <h1 className="text-3xl font-bold mb-4 text-white">Contact</h1>
      
      <p className="mb-6">
        Have feedback, suggestions, or questions? Feel free to reach out using the form below or connect with me on GitHub.
      </p>

      <form className="space-y-4">
        <div>
          <label className="block mb-1 text-sm">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Message</label>
          <textarea
            rows="5"
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded"
            placeholder="Your message..."
          ></textarea>
        </div>
        <button
          type="submit"
          disabled
          className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded text-sm text-white cursor-not-allowed"
        >
          Submit (Disabled - Demo)
        </button>
      </form>

      <div className="mt-8">
        <p className="text-sm">
          Or find me on GitHub:{" "}
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            @yourusername
          </a>
        </p>
      </div>
    </div>
  );
}
