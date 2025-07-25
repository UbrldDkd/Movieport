// import React, { useRef, useEffect, useState } from 'react';

// const START_YEAR = 1980;
// const END_YEAR = 2030;

// export default function ScrollMenu() {
//   const containerRef = useRef(null);
//   const [selectedYear, setSelectedYear] = useState(null);

//   const years = Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) => START_YEAR + i);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const onScroll = () => {
//       const { top, height } = container.getBoundingClientRect();
//       const centerY = top + height / 2;

//       let closest = null;
//       let minDist = Infinity;

//       Array.from(container.children).forEach((child) => {
//         const rect = child.getBoundingClientRect();
//         const childCenter = rect.top + rect.height / 2;
//         const distance = Math.abs(centerY - childCenter);

//         if (distance < minDist) {
//           minDist = distance;
//           closest = child;
//         }
//       });

//       if (closest) {
//         setSelectedYear(Number(closest.dataset.year));
//       }
//     };

//     container.addEventListener('scroll', onScroll, { passive: true });
//     onScroll(); // Initial check

//     return () => container.removeEventListener('scroll', onScroll);
//   }, []);

//   return (
//     <div className="relative h-80 w-32 mx-auto overflow-y-auto border border-gray-300 rounded">
//       {/* Center highlight line */}
//       <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-red-500 -translate-y-1/2 pointer-events-none z-10" />

//       <div ref={containerRef} className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
//         {years.map((year) => (
//           <div
//             key={year}
//             data-year={year}
//             className={`snap-center text-center py-4 transition-all ${
//               selectedYear === year
//                 ? 'text-black font-bold text-lg'
//                 : 'text-gray-400'
//             }`}
//           >
//             {year}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
