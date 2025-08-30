import React, { useState, useEffect } from "react";
import { useFetchEpisode } from "./CustomHooks/useFetchEpisode";

export default function EpisodeDisplay({ seasonNumber, episodeNumber, id, trailerOpen }) {
  const [visible, setVisible] = useState(true);
  const [openDesc, setOpenDesc] = useState(true);


  const {episode, isLoading, error} = useFetchEpisode({
    id,
    seasonNumber,
    episodeNumber
  });

  // Reset visibility and description when episode changes
  useEffect(() => {
    setVisible(true);
    setOpenDesc(true);
  }, [episode]);

  // Hide episode display when id or trailer changes
  useEffect(() => {
    setVisible(false);
  }, [id, trailerOpen]);

  if (!episode || !visible) return null;

  const {
    still_path,
    name,
    overview,
    air_date,
    episode_number,
    season_number,
    vote_average,
    runtime
  } = episode;

  const imageUrl = still_path
    ? `https://image.tmdb.org/t/p/original${still_path}`
    : "https://via.placeholder.com/780x440?text=No+Image";

  return (
  <div className="relative w-full bg-zinc-900 text-zinc-300 font-normal rounded-lg overflow-hidden shadow-lg mb-6">

    {/* Close Button */}
    <button
      onClick={() => setVisible(false)}
      className="absolute top-3 right-3 text-zinc-400 hover:text-white text-xl font-bold"
    >
      ✕
    </button>

    {/* Loading State */}
    {isLoading && (
      <div className="flex items-center justify-center h-64 transition-opacity duration-300 opacity-100">
        <div className="w-10 h-10 border-4 border-red-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )}

    {/* Error State */}
    {!isLoading && error && (
      <div className="flex items-center justify-center h-64 text-red-500 transition-opacity duration-300 opacity-100">
        <p>{error}</p>
      </div>
    )}

    {/* Content */}
    {!isLoading && !error && (
      <div className="transition-opacity duration-500 opacity-100">

        {/* Image */}
        <img
          src={imageUrl}
          alt={name}
          className="w-full object-cover"
        />

        {/* Show Description Button below image */}
        <div
          className={`flex justify-center z-10 relative transition-opacity duration-300 ${
            openDesc ? "opacity-0" : "opacity-100"
          }`}
        >
          <button
            onClick={() => setOpenDesc(true)}
            className="w-36 text-zinc-400 font-light py-1 cursor-pointer rounded-lg transition-colors duration-200"
          >
            Show Description
          </button>
        </div>

        {/* Episode Content */}
        {openDesc && (
          <div className="px-4 pb-4 transition-opacity duration-300">

            {/* Episode Title and Runtime */}
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              S{season_number}E{episode_number}: {name}
              {runtime && (
                <span className="flex items-center text-base font-light">
                  <span className="w-1 h-1 bg-red-900 rounded-full inline-block mr-1"></span>
                  {runtime}m
                </span>
              )}
            </h2>

            {/* Air Date */}
            <p className="text-sm text-zinc-400 mb-2">
              Air Date: {air_date || "Unknown"}
            </p>

            {/* Overview */}
            <p className="text-base mb-4">
              {overview || "No overview available."}
            </p>

            {/* Rating and Hide Description Button */}
            <div className="flex justify-between items-center">
              <p className="text-amber-300 font-light">
                {vote_average && vote_average.toFixed(1) + "/10"}
              </p>
              <button
                onClick={() => setOpenDesc(false)}
                className="text-red-900 text-base active:text-red-800 cursor-pointer"
              >
                Hide Description
              </button>
            </div>

          </div>
        )}
      </div>
    )}

  </div>
);

}
