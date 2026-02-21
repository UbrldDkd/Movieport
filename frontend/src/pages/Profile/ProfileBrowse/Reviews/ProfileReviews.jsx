import ReviewsSection from '../../../../components/Sections/Reviews/ReviewsSection';
export default function ProfileReviews() {
  return (
    <div className='bg-bg-secondary  rounded-sm p-3 min-h-screen text-zinc-400'>
      <ReviewsSection includeItemDetails={true} />
    </div>
  );
}
