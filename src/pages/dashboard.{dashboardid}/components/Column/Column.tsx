import styles from './Column.module.scss';
import Card from '../ColumnCard/ColumnCard';
import ColumnHeader from '../ColumnHeader/ColumnHeader';

interface ColumnProps {}

function Column() {
  const CardProps = {
    assignee: 'unknown',
    title: 'title',
    dueDate: new Date('1915-08-15 19:20:30'),
    tags: ['프론트'],
  };
  const CardProps2 = {
    assignee: 'unknown',
    title: 'title',
    dueDate: new Date('1915-08-15 19:20:30'),
    tags: ['프론트'],
    imageUrl: '/img/test_img.png',
  };

  return (
    <div className={styles.column}>
      <ColumnHeader name="할 일" />
      <Card {...CardProps} />
      <Card {...CardProps2} />
      <Card {...CardProps} />
    </div>
  );
}

export default Column;
