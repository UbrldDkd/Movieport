// Icons
import { AiFillEye, AiOutlineEye } from 'react-icons/ai';
import { HiDotsVertical } from 'react-icons/hi';
import { VscHeart, VscHeartFilled } from 'react-icons/vsc';

// API hooks
import { useToggleContentRelation } from '../../../api/contentRelations/useToggleContentRelation';

export default function ContentCardActions({
  item,
  current,
  view,
  setMenuOpen,
}) {
  const toggleField = useToggleContentRelation();
  return (
    <div
      className={`absolute top-[0.5px] left-1/2 transform -translate-x-1/2
                 flex items-center gap-2 p-1 bg-zinc-950/80 backdrop-blur-md
                 opacity-0 justify-center group-hover:opacity-100 transition-opacity
                 pointer-events-none z-10 rounded-sm 
                 ${view == 'xl' ? 'w-[60%] h-[14%] md:w-[50%] md:h-[10%]' : view == 'lg' ? 'w-[65%] h-[15%]' : view == 'md' ? 'w-[90%] h-[21%] md:w-[80%] md:h-[17%]' : 'w-full h-[25%] md:w-[85%] md:h-[23%]'}
                 `}
    >
      <button
        onClick={() => toggleField(item, 'watched')}
        className='relative w-6 h-6 flex items-center justify-center pointer-events-auto hover:cursor-pointer'
      >
        <AiFillEye
          className={`${current?.watched ? 'opacity-100' : 'opacity-0'} absolute text-amber-200/75 ${view == 'sm' ? 'w-4 h-4' : 'w-5 :h-5 '}`}
        />
        <AiOutlineEye
          className={`${!current?.watched ? 'opacity-100' : 'opacity-0'} absolute text-gray-400 ${view == 'sm' ? 'w-4 h-4' : 'w-5 h-5'}`}
        />
      </button>

      <button
        onClick={() => toggleField(item, 'liked')}
        className='relative w-6 h-6 flex items-center justify-center pointer-events-auto hover:cursor-pointer'
      >
        <VscHeartFilled
          className={`${current?.liked ? 'opacity-100' : 'opacity-0'} absolute text-red-900 ${view == 'sm' ? 'w-4 h-4' : 'w-5 h-5'}`}
        />
        <VscHeart
          className={`${current?.liked ? 'opacity-0' : 'opacity-100'} absolute text-gray-400 ${view == 'sm' ? 'w-4 h-4' : 'w-5 h-5'}`}
        />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setMenuOpen((p) => !p);
        }}
        className='w-6 h-6 flex items-center justify-center pointer-events-auto text-zinc-200 transition-colors duration-120 hover:text-red-900 hover:cursor-pointer'
      >
        <HiDotsVertical
          className={`absolute  ${view == 'sm' ? 'w-4 h-4' : 'w-5 h-5'}`}
        />
      </button>
    </div>
  );
}
