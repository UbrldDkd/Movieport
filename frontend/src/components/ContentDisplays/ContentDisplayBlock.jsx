// Utils helpers
import { Keys } from '../../utils/constants/Keys';

// Components
import ContentCard from './ContentCard/ContentCard';
import ContentCardWithContentRelations from './ContentCard/ContentCardWithContentRelations';

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
    <div
      className={`w-full ${view === 'lg' ? 'px-2' : view === 'md' ? 'px-1' : 'px-4.75'} sm:px-0 md:px-0   flex  justify-${justify}`}
    >
      {/* shrink-to-content container */}
      <div className={`flex w-full flex-wrap gap-2.5 justify-${justify}`}>
        {content &&
          Array.isArray(content) &&
          content
            .slice(0, displayAmount)
            .map((item) =>
              includeContentRelations ? (
                <ContentCardWithContentRelations
                  key={item[details.id]}
                  item={item}
                  view={view}
                />
              ) : (
                <ContentCard key={item[details.id]} item={item} view={view} />
              )
            )}
      </div>
    </div>
  );
}
