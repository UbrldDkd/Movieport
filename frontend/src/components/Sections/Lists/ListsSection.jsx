// React
import PropTypes from 'react';

// Third-party
import { Link } from 'react-router-dom';

// Components
import ListCard from '../../List/ListCard';
import SectionHeader from '../Common/SectionHeader';

export default function ListsSection({
  header,
  lists = [],
  isLoading,
  posterAmount,
  url = '12',
}) {
  if (isLoading) {
    return (
      <div>
        <SectionHeader header={header} />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className='bg-zinc-800/30 p-4 rounded-sm animate-pulse'
            >
              <div className='h-4 w-3/4 bg-zinc-800/50 rounded mb-2' />
              <div className='h-3 w-1/2 bg-zinc-800/50 rounded mb-2' />
              <div className='h-3 w-full bg-zinc-800/50 rounded' />
            </div>
          ))}
        </div>
      </div>
    );
  }
  const TMDB = 'https://image.tmdb.org/t/p/w185';
  const staticLists = [
    {
      id: 1,
      title: 'Punk & Post-Punk on Film',
      description:
        'From CBGB to the Haçienda — films that actually get the music right.',
      item_count: 18,
      film_count: 18,
      tv_count: 0,
      like_count: '3.1K',
      username: 'rotten_tomato',
      posters: [
        `${TMDB}/wdaClThqMd3xMIRbVCdZFW4INkw.jpg`, // Sid & Nancy
        `${TMDB}/2CAL2433ZeIihfX1Hb2139CX0pQ.jpg`, // Control
        `${TMDB}/sRuSgBm1e9e3sFZc8zcjFMIzTqE.jpg`, // Trainspotting
        `${TMDB}/9w0Vh9eRxCZxAH6E0BnOB3LFgCe.jpg`, // 24 Hour Party People
      ],
    },
    {
      id: 2,
      title: 'Music Docs That Are Actually Cinema',
      description:
        'Stop Making Sense changed what a concert film could be. These follow suit.',
      item_count: 14,
      film_count: 14,
      tv_count: 0,
      like_count: '6.8K',
      username: 'celluloid_sound',
      posters: [
        `${TMDB}/gHlnMg3EeCMj0BEbGi2lfGCElAi.jpg`, // Stop Making Sense
        `${TMDB}/hXqgMDxHNPQnk5YbvRG4HlGqy0.jpg`, // The Last Waltz
        `${TMDB}/8h9YMFn0PrGHWKrxCGxfEkFa0J2.jpg`, // Gimme Shelter
        `${TMDB}/bXs6ZqHPALgE3SWhiPjVvLMiBHI.jpg`, // Don't Look Back
      ],
    },
    {
      id: 3,
      title: 'Biopics Worth the Runtime',
      description:
        'No rose-tinted glasses. Musicians portrayed with actual complexity.',
      item_count: 22,
      film_count: 22,
      tv_count: 0,
      like_count: '11.4K',
      username: 'backstage_pass',
      posters: [
        `${TMDB}/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg`, // Bohemian Rhapsody
        `${TMDB}/rCx1bEvqcaJEXMkWfq1yXo4XHRL.jpg`, // Almost Famous
        `${TMDB}/5v9gQdyAnZ4NNpYSQkBZaXVuILB.jpg`, // Walk the Line
        `${TMDB}/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg`, // Ray
      ],
    },
    {
      id: 4,
      title: 'Films That Sound Like Their Soundtrack',
      description: 'The score IS the film. Remove the music and nothing works.',
      item_count: 31,
      film_count: 24,
      tv_count: 7,
      like_count: '9.2K',
      username: '_audiophile',
      posters: [
        `${TMDB}/wdaClThqMd3xMIRbVCdZFW4INkw.jpg`, // Drive
        `${TMDB}/4c2GqHDeHFl5W2A0oXQMBSjnE7E.jpg`, // Lost in Translation
        `${TMDB}/sRuSgBm1e9e3sFZc8zcjFMIzTqE.jpg`, // Her
        `${TMDB}/2CAL2433ZeIihfX1Hb2139CX0pQ.jpg`, // Marie Antoinette
      ],
    },
    {
      id: 5,
      title: 'Underground & Cult — No Mainstream Allowed',
      description:
        'Midnight movies, no-budget gems, and stuff your algorithm will never surface.',
      item_count: 44,
      film_count: 39,
      tv_count: 5,
      like_count: '2.7K',
      username: 'vhs_forever',
      posters: [
        `${TMDB}/9w0Vh9eRxCZxAH6E0BnOB3LFgCe.jpg`,
        `${TMDB}/8h9YMFn0PrGHWKrxCGxfEkFa0J2.jpg`,
        `${TMDB}/hXqgMDxHNPQnk5YbvRG4HlGqy0.jpg`,
        `${TMDB}/bXs6ZqHPALgE3SWhiPjVvLMiBHI.jpg`,
      ],
    },
    {
      id: 6,
      title: 'TV That Treats Music Like a Character',
      description:
        'Euphoria, Vinyl, Daisy Jones — shows where the playlist matters as much as the plot.',
      item_count: 12,
      film_count: 0,
      tv_count: 12,
      like_count: '4.5K',
      username: 'serialwatcher',
      posters: [
        `${TMDB}/4c2GqHDeHFl5W2A0oXQMBSjnE7E.jpg`,
        `${TMDB}/wdaClThqMd3xMIRbVCdZFW4INkw.jpg`,
        `${TMDB}/2CAL2433ZeIihfX1Hb2139CX0pQ.jpg`,
        `${TMDB}/sRuSgBm1e9e3sFZc8zcjFMIzTqE.jpg`,
      ],
    },
  ];

  const displayLists = lists.length > 0 ? lists : staticLists;

  return (
    <div className=''>
      <SectionHeader header={header} url={url} />

      <div className='flex flex-col  gap-4'>
        {displayLists.slice(0, 4).map((list) => (
          <div
            key={list.id}
            className=' p-4 rounded-sm hover:bg-secondary transition-colors  '
          >
            <ListCard list={list} posterAmount={posterAmount} compact='md' />
          </div>
        ))}
      </div>
    </div>
  );
}
