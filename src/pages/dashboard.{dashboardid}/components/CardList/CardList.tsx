import ColumnCard from '../ColumnCard/ColumnCard';
import { CardOverAll } from '../../../../api/apiModule';

interface CardListProps {
  cardList: CardOverAll[];
  hasNext: boolean;
  setElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

function CardList({ cardList, hasNext, setElement }: CardListProps) {
  return (
    <div>
      {cardList.map((cardData) => (
        <ColumnCard
          key={cardData.id}
          assignee={cardData.assignee.nickname}
          title={cardData.title}
          dueDate={cardData.dueDate}
          tags={cardData.tags}
          imageUrl={cardData?.imageUrl}
        />
      ))}
      {hasNext && <div ref={setElement} style={{ height: '20px' }} />}
    </div>
  );
}

export default CardList;
