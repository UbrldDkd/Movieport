import { useEffect, useRef, useState } from 'react';
import { useCreateReview } from '../../../api/reviews/useCreateReview';
import { IoIosStar } from 'react-icons/io';
import ContentCardPoster from '../../ContentDisplays/ContentCard/ContentCardPoster';
import ContentContainer from '../../../components/WrapperContainers/ContentContainer';
import DatePicker from './DatePicker/DatePicker';

export default function ReviewModal({ item, onClose }) {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [watchedStatus, setWatchedStatus] = useState('watched');
  const [watchedDate, setWatchedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const [containsSpoilers, setContainsSpoilers] = useState(false);
  const { createReview, isLoading, error } = useCreateReview();
  const modalRef = useRef(null);

  const releaseDate = item.release_date
    ? new Date(item.release_date).toISOString().split('T')[0]
    : '1900-01-01';

  const today = new Date().toISOString().split('T')[0];

  const formattedWatchedDate = new Date(
    watchedDate + 'T00:00:00'
  ).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSave = async () => {
    const saved = await createReview({
      item,
      review: reviewText,
      rating,
      watched_status: watchedStatus,
      watched_date: watchedDate,
      contains_spoilers: containsSpoilers,
    });
    if (saved) onClose();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75'>
      <div
        ref={modalRef}
        className='relative w-full max-w-2xl rounded-sm overflow-visible'
      >
        <ContentContainer>
          {/* Header */}
          <div className='flex items-center justify-between px-5 py-3 border-b border-zinc-800'>
            <p className='text-sm text-zinc-400 tracking-wider font-semibold'>
              I {watchedStatus}{' '}
              <span className='font-medium text-text-primary'>
                {item.title}
              </span>{' '}
              on{' '}
              <span className='relative inline-block'>
                <button
                  type='button'
                  onClick={() => setShowCalendar((v) => !v)}
                  className='border border-zinc-700 rounded-sm px-2 py-0.5 text-zinc-200 text-sm hover:border-zinc-500 transition-colors'
                >
                  {formattedWatchedDate}
                </button>
                {showCalendar && (
                  <DatePicker
                    value={watchedDate}
                    min={releaseDate}
                    max={today}
                    onChange={setWatchedDate}
                    onClose={() => setShowCalendar(false)}
                  />
                )}
              </span>
            </p>
            <button
              type='button'
              onClick={onClose}
              className='text-zinc-600 hover:text-zinc-300 transition-colors text-lg leading-none'
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className='flex gap-5 p-5'>
            <div className='flex-shrink-0 w-[150px] overflow-hidden'>
              <ContentCardPoster
                item={item}
                posterPath={item.poster_path}
                view='lg'
              />
            </div>

            <div className='flex-1 flex flex-col gap-4'>
              <h2 className='text-xl text-zinc-100'>
                <span className='font-semibold'>{item.title}</span>{' '}
                <span className='text-zinc-500 font-semibold text-sm'>
                  {item.release_date?.slice(0, 4)}
                </span>
              </h2>

              <div className='flex items-center gap-5'>
                <label className='flex items-center gap-2 cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={watchedStatus === 'watched'}
                    onChange={() => setWatchedStatus('watched')}
                    className='accent-red-900 w-4 h-4'
                  />
                  <span className='text-xs text-zinc-400 tracking-wider font-semibold'>
                    Watched
                  </span>
                </label>
                <label className='flex items-center gap-2 cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={watchedStatus === 'rewatched'}
                    onChange={() => setWatchedStatus('rewatched')}
                    className='accent-red-900 w-4 h-4'
                  />
                  <span className='tracking-wider font-semibold text-xs text-zinc-400'>
                    I've watched this before
                  </span>
                </label>
              </div>

              <div className='flex flex-col'>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={5}
                  className={`w-full bg-zinc-800/60 border-2 border-zinc-700 px-3 py-2.5 text-sm font-semibold tracking-wide text-zinc-200 placeholder-zinc-600 outline-none focus:bg-zinc-700 resize-none transition-all duration-200 ${reviewText ? 'rounded-t-sm' : 'rounded-sm'}`}
                  placeholder='Add a review...'
                />
                <div
                  className='overflow-hidden transition-all duration-300 ease-in-out'
                  style={{
                    maxHeight: reviewText ? '48px' : '0px',
                    opacity: reviewText ? 1 : 0,
                  }}
                >
                  <div className='flex items-center gap-3 bg-zinc-800 border-2 border-t-0 border-zinc-700 rounded-b-sm px-3 py-2'>
                    <label className='flex items-center gap-2 cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={containsSpoilers}
                        onChange={(e) => setContainsSpoilers(e.target.checked)}
                        className='accent-red-900 w-3.5 h-3.5'
                      />
                      <span className='text-[11px] tracking-wider text-zinc-400'>
                        Contains spoilers
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <span className='text-[10px] tracking-[0.2em] uppercase text-zinc-600'>
                  Rating{rating > 0 ? ` — ${rating} out of 5` : ' — 0 out of 5'}
                </span>
                <div className='flex gap-1'>
                  {[1, 2, 3, 4, 5].map((value) => {
                    const half = value - 0.5;
                    return (
                      <div key={value} className='relative w-6 h-6'>
                        <button
                          type='button'
                          className='absolute left-0 top-0 h-full w-1/2'
                          onClick={() => setRating(half)}
                        />
                        <button
                          type='button'
                          className='absolute right-0 top-0 h-full w-1/2'
                          onClick={() => setRating(value)}
                        />
                        {rating >= value ? (
                          <IoIosStar className='w-6 h-6 text-red-900' />
                        ) : rating >= half ? (
                          <>
                            <IoIosStar className='w-6 h-6 text-zinc-700 absolute' />
                            <div className='absolute inset-0 overflow-hidden w-1/2'>
                              <IoIosStar className='w-6 h-6 text-red-900' />
                            </div>
                          </>
                        ) : (
                          <IoIosStar className='w-6 h-6 text-zinc-700' />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {error && (
                <p className='text-xs text-red-400 tracking-wider'>{error}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className='flex justify-end px-5 py-3 border-t border-zinc-800 bg-zinc-950/40'>
            <button
              type='button'
              onClick={handleSave}
              disabled={isLoading || rating === 0}
              className='px-6 py-1.5 text-xs tracking-widest uppercase font-medium bg-red-950 text-red-200 hover:bg-red-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-sm'
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </ContentContainer>
      </div>
    </div>
  );
}
