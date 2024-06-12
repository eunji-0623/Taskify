import { ReactEventHandler } from 'react';
import ColumnCard from '../ColumnCard/ColumnCard';
import { CardOverAll } from '../../../../api/apiModule';

interface CardListProps {
  cardList: CardOverAll[];
  hasNext: boolean;
  columnData: {
    userId: number;
    columnId: number;
    dashboardId: number;
  };
  setElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  handleCardOnclick: ReactEventHandler;
}

function CardList({
  cardList,
  hasNext,
  columnData,
  setElement,
  handleCardOnclick,
}: CardListProps) {
  return (
    <div>
      {cardList.map((cardData) => (
        <ColumnCard
          key={cardData.id}
          cardId={cardData.id}
          cardData={cardData}
          columnData={columnData}
          handleCardOnclick={handleCardOnclick}
        />
      ))}
      {hasNext && <div ref={setElement} style={{ height: '20px' }} />}
    </div>
  );
}

export default CardList;
