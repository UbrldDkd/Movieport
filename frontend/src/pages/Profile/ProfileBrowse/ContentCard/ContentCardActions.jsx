import { useToggleContentRelation } from '../../../../api/contentRelations/useToggleContentRelation';
import { AiFillEye, AiOutlineEye } from 'react-icons/ai';
import { HiDotsVertical } from 'react-icons/hi';
import { VscHeart, VscHeartFilled } from 'react-icons/vsc';

export default function ContentCardActions({
  item,
  current,
  view,
  setMenuOpen,
}) {
  const toggleField = useToggleContentRelation();
  console.log(current);
  return (
    <div
      className={`absolute top-[0.5px] left-1/2 transform -translate-x-1/2
                 flex items-center gap-2 p-1 bg-zinc-950/80 backdrop-blur-md
                 opacity-0 group-hover:opacity-100 transition-opacity
                 pointer-events-none z-10 rounded-sm 
                 ${view == 'lg' ? 'w-[65%] h-[15%]' : view == 'md' ? 'w-[80%] h-[17%]' : 'w-[85%] h-[23%]'}
                 `}
    >
      <button
        onClick={() => toggleField(item, 'watched')}
        className='relative w-6 h-6 flex items-center justify-center pointer-events-auto hover:cursor-pointer'
      >
        <AiFillEye
          className={`${current?.watched ? 'opacity-100' : 'opacity-0'} absolute text-amber-200/75 ${view == 'lg' ? 'w-5 h-5' : view == 'md' ? 'w-3 h-3' : view == 'sm' ? 'w-4 h-4' : ''}`}
        />
        <AiOutlineEye
          className={`${!current?.watched ? 'opacity-100' : 'opacity-0'} absolute text-gray-400 ${view == 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`}
        />
      </button>

      <button
        onClick={() => toggleField(item, 'liked')}
        className='relative w-6 h-6 flex items-center justify-center pointer-events-auto hover:cursor-pointer'
      >
        <VscHeartFilled
          className={`${current?.liked ? 'opacity-100' : 'opacity-0'} absolute text-red-800 ${view == 'lg' ? 'w-5 h-5' : view == 'sm' ? 'w-4 h-4' : ''}`}
        />
        <VscHeart
          className={`${current?.liked ? 'opacity-0' : 'opacity-100'} absolute text-gray-400 ${view == 'lg' ? 'w-5 h-5' : view == 'sm' ? 'w-4 h-4' : ''}`}
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
          className={`absolute  ${view == 'lg' ? 'w-5 h-5' : view == 'sm' ? 'w-4 h-4' : ''}`}
        />
      </button>
    </div>
  );
}
