import ContentCard from './ContentCard/ContentCard';
import ContentCardWithContentRelations from './ContentCard/ContentCardWithContentRelations';
import { Keys } from '../../utils/constants/Keys';

// display content as a block
export default function ContentDisplayBlock({
  content,
  displayAmount,
  view = 'lg',
  includeContentRelations,
  justify = 'center',
}) {
  const { API1 } = Keys;
  const { details } = API1;

  return (
    <div className='w-full flex justify-center'>
      {/* shrink-to-content container */}
      <div
        className={`flex flex-wrap justify-${justify} w-fit`}
        style={{ gap: '10px' }} // exact 2.5
      >
        {content && Array.isArray(content) ? (
          content
            .slice(0, displayAmount)
            .map((item) =>
              includeContentRelations ? (
                <ContentCardWithContentRelations
                  key={item[details.id]}
                  item={item}
                />
              ) : (
                <ContentCard key={item[details.id]} item={item} view={view} />
              )
            )
        ) : (
          <p className='text-base text-red-900'>Content not found</p>
        )}
      </div>
    </div>
  );
}
