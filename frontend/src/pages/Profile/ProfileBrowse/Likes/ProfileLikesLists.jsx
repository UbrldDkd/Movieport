import ListCard from '../../../../components/List/ListCard';

export default function ProfileLikesLists({ lists, username, isOwner }) {
  console.log(lists);
  if (!lists || lists.length === 0) {
    return (
      <div className='py-12 text-center text-zinc-400 font-medium text-sm'>
        {isOwner
          ? `You haven't liked any lists yet`
          : `${username} hasn't liked any lists yet`}
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-2'>
      {lists.map((list) => (
        <ListCard key={list.id} list={list} username={list.username} />
      ))}
    </div>
  );
}
