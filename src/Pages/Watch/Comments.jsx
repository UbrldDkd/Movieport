import React, { useState } from 'react';
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

export default function Comments() {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Alice",
      text: "This is a really cool post!",
      time: "2 hours ago",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Bob",
      text: "I totally agree with Alice.",
      time: "1 hour ago",
      rating: 3,
    },
  ]);

  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);

  const guestAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  // Function to render stars with half-star support
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<IoStar key={i} className="text-amber-300" />);
      } else if (rating >= i - 0.5) {
        stars.push(<IoStarHalf key={i} className="text-amber-300" />);
      } else {
        stars.push(<IoStarOutline key={i} className="text-amber-300" />);
      }
    }
    return stars;
  };

  // Add a new comment
  const addComment = () => {
    if (!newComment.trim()) return;

    const minutesAgo = Math.floor(Math.random() * 60);

    const comment = {
      id: comments.length + 1,
      name: "Guest",
      text: newComment,
      time: minutesAgo + " minutes ago",
      rating: newRating,
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setNewRating(0);
  };

  // Handle star selection for new comment
  const selectStar = (index) => {
    const newVal = newRating === index + 1 ? index + 0.5 : index + 1;
    setNewRating(newVal);
  };

  // Handle Enter key for submitting comment
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addComment();
    }
  };

  return (
    <div className="w-full mx-auto py-4 px-3 rounded-sm space-y-4">

      {/* New Comment Input */}
      <div className="flex flex-col space-y-2 mb-4">

        <textarea
          className="p-2 rounded-md bg-gradient-to-b min-h-20 from-red-950 to-zinc-950 bg-opacity-50 backdrop-blur-md text-zinc-400 w-full resize-none focus:outline-none placeholder:text-zinc-500 transition-all"
          rows={1}
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);

            // Auto-grow
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          onKeyDown={handleKeyDown}
        />

        <div className="flex items-center justify-between">

          {/* Star rating selector */}
          <div className="flex space-x-1 cursor-pointer">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} onClick={() => selectStar(i)}>
                {newRating >= i + 1 ? (
                  <IoStar className="text-amber-300" />
                ) : newRating >= i + 0.5 ? (
                  <IoStarHalf className="text-amber-300" />
                ) : (
                  <IoStarOutline className="text-amber-300" />
                )}
              </span>
            ))}
          </div>

          {/* Publish button */}
          <button
            onClick={addComment}
            className="px-4 py-1 rounded-2xl font-semibold transition-colors
                       bg-red-950 text-zinc-400
                       hover:bg-zinc-400 hover:text-red-950
                       active:bg-zinc-300 active:text-red-800"
          >
            Publish
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-3">
        {comments.map(comment => (
          <div
            key={comment.id}
            className="flex space-x-3 items-start bg-gradient-to-l p-3 rounded-md"
          >
            {/* Avatar */}
            <img
              src={guestAvatar}
              alt="Guest"
              className="w-10 h-10 rounded-full"
            />

            {/* Comment Content */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-zinc-200">{comment.name}</span>
                <span className="text-xs text-zinc-400">{comment.time}</span>
              </div>

              {/* Rating Stars */}
              <div className="flex items-center mb-1">
                {renderStars(comment.rating)}
              </div>

              {/* Comment Text */}
              <p className="text-zinc-300 text-sm">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
