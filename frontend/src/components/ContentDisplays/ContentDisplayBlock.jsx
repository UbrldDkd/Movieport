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
    <div className={`w-full  flex  justify-${justify}`}>
      {/* shrink-to-content container */}
      <div className={`flex w-full flex-wrap gap-2.5 justify-${justify} w-fit`}>
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
