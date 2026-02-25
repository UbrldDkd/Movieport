// Utils helpers
import { Keys } from '../../utils/constants/Keys';

// Components
import ContentCard from './ContentCard/ContentCard';
import ContentCardWithContentRelations from './ContentCard/ContentCardWithContentRelations';

// display content as a block
export default function ContentDisplayBlock({
  content,
  displayAmount,
  view = 'sectionLg',
  includeContentRelations,
  justify = 'center',
}) {
  const { API1 } = Keys;
  const { details } = API1;

  return (
    <div className={`w-full sm:px-0 md:px-0   flex  justify-${justify}`}>
      {/* shrink-to-content container */}
      <div
        className={`flex bg-zinc-400 w-full  flex-wrap gap-2 justify-${justify}`}
      >
        {content &&
          Array.isArray(content) &&
          content.slice(0, displayAmount).map((item) =>
            includeContentRelations ? (
              <div key={item[details.id]}>
                <ContentCardWithContentRelations item={item} view={view} />
              </div>
            ) : (
              <div key={item[details.id]}>
                <ContentCard item={item} view={view} />
              </div>
            )
          )}
      </div>
    </div>
  );
}
