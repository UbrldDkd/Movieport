import HeroCarousel from './HeroCarousel.jsx';
import { sampleMovies } from './MovieDataTemp.js';

export default function Main() {
    return (
        <div className="bg-zinc-900 pt-3 ">
            <HeroCarousel movies={sampleMovies} />
        </div>
    )
}