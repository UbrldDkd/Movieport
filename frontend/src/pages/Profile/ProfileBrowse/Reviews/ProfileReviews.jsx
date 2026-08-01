import ReviewsSection from '../../../../components/Sections/Reviews/ReviewsSection';
import { Tooltip } from '../../../../components/Common/Tooltip.jsx';
export default function ProfileReviews({ reviews = [], isOwner, username }) {
  return (
    <div className='bg-bg-secondary  rounded-sm p-3 min-h-screen text-text-primary'>
      <Tooltip label={`${reviews.length} reviews`}>
        <h2 className='text-xs font-semibold tracking-widest mb-2'>REVIEWS</h2>
      </Tooltip>
      <ReviewsSection
        includeItemDetails={true}
        reviews={reviews}
        showProfile={false}
      />
    </div>
  );
}
