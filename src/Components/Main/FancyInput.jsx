import { useState } from "react";

export default function SmoothFocusInput() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex items-center m-10 justify-center bg-zinc-950">
      <input
        type="text"
        placeholder="Click me"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`px-4 py-2 text-lg border rounded-md
          transition-all duration-400 ease-
          ${isFocused ? 'border-g bg-transparent border-none to-zinc-800 outline-none scale-110 shadow-lg text-zinc-100' : 'bg-transparent scale-100 border-none text-zinc-400'}`}
      />
    </div>
  );
}
