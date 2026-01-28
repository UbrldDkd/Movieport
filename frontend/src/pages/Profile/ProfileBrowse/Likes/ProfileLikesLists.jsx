import ListCard from '../../ProfileBrowse/Lists/ListCard';

export default function ProfileLikesLists({ lists }) {
  if (!lists || lists.length === 0) {
    return (
      <div className='text-center text-zinc-400 py-8'>No liked lists yet</div>
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
