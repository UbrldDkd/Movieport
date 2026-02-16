import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function SectionHeader({ header, url }) {
  return (
    <>
      <div className='flex justify-between items-baseline'>
        <div className=' font-semibold tracking-widest text-zinc-300/90'>
          {header}
        </div>{' '}
        {url && (
          <Link
            to={url}
            className='text-xs font-semibold tracking-widest text-zinc-400 hover:text-zinc-200'
          >
            VIEW ALL
          </Link>
        )}
      </div>
      <div className='mt-1 mb-2.5 border-b border-zinc-600' />
    </>
  );
}

SectionHeader.propTypes = {
  header: PropTypes.string.isRequired,
  url: PropTypes.string,
};
