import ListCardCompact from '../../List/ListCardCompact';
import PropTypes from 'prop-types';
import SectionHeader from '../Common/SectionHeader';

export default function ListsSectionSummary({
  lists = [],
  posterAmount,
  header,
  includeItemCount = false,
  compact = 'md',
  displayAxis = 'x',
}) {
  const staticLists = [
    {
      id: 1,
      title: 'Best Sci-Fi Films of the 2010s',
      description: 'A collection of groundbreaking science fiction movies.',
      item_count: 77,
      film_count: 47,
      tv_count: 30,
      like_count: '12K',
      username: 'scifi_fan',
      items: [
        { id: 101, poster_path: '/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg' },
        { id: 102, poster_path: '/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg' },
        { id: 103, poster_path: '/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg' },
        { id: 104, poster_path: '/e1mjopzAS2KNsvpbpahQ1a6SkSn.jpg' },
        { id: 105, poster_path: '/2TeJfUZMGolfDdW6DKhfIWqvq8y.jpg' },
        { id: 106, poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg' },
      ],
    },
    {
      id: 2,
      title: 'Mind-Bending Movies That Will Blow Your Mind',
      description: 'Films that challenge reality and perception.',
      item_count: 26,
      film_count: 23,
      tv_count: 3,
      like_count: '8.5K',
      username: 'mind_bender',
      items: [
        { id: 201, poster_path: '/aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg' },
        { id: 202, poster_path: '/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg' },
        { id: 203, poster_path: '/l8RKDgjl9co0IgFZblxhtIOi5Uj.jpg' },
        { id: 204, poster_path: '/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg' },
        { id: 205, poster_path: '/kqjL17yufvn9OVLyXYpvtyrFfak.jpg' },
        { id: 206, poster_path: '/5KCVkau1HEl7ZzfPsKAPM0sMiKc.jpg' },
      ],
    },
    {
      id: 3,
      title: "Director's Masterpieces",
      description: 'Essential films from visionary directors.',
      item_count: 56,
      film_count: 31,
      tv_count: 25,
      like_count: '5.2K',
      username: 'film_buffs_unite',
      items: [
        { id: 301, poster_path: '/kqjL17yufvn9OVLyXYpvtyrFfak.jpg' },
        { id: 302, poster_path: '/5KCVkau1HEl7ZzfPsKAPM0sMiKc.jpg' },
        { id: 303, poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg' },
        { id: 304, poster_path: '/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg' },
        { id: 305, poster_path: '/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg' },
        { id: 306, poster_path: '/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg' },
      ],
    },
  ];

  const axisClass =
    displayAxis === 'y'
      ? 'flex flex-col gap-2 '
      : 'md:flex-row flex-col justify-center flex-nowrap md:flex-wrap';

  return (
    <div>
      <SectionHeader header={header} />
      <div
        className={`flex ${axisClass}  scrollbar-hide gap-2 md:gap-11 justify-center  overflow-x-auto md:overflow-visible`}
      >
        {staticLists.map((list) => (
          <div
            key={list.id}
            className='w-full  md:w-auto flex justify-center rounded-sm transition-colors duration-100 hover:bg-zinc-800/30'
          >
            <ListCardCompact
              list={list}
              posterAmount={posterAmount}
              includeItemCount={includeItemCount}
              compact={compact}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

ListsSectionSummary.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object),
  posterAmount: PropTypes.number,
  header: PropTypes.string,
  includeItemCount: PropTypes.bool,
  displayAxis: PropTypes.oneOf(['x', 'y']),
  compact: PropTypes.oneOf(['lg', 'md']),
};
