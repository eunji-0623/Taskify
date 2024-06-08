import styles from './Column.module.scss';
import ColumnCard from '../ColumnCard/ColumnCard';
import ColumnHeader from '../ColumnHeader/ColumnHeader';
import { AddNewTaskBtn } from '../../../../components/Btn/Btn';

function Column() {
  const handleAddTaskBtn = () => {};

  const CardProps = {
    assignee: 'unknown',
    title: 'title',
    dueDate: new Date('1915-08-15 19:20:30'),
    tags: ['프론트', '프로젝트', '월요일', '좋아'],
  };
  const CardProps2 = {
    assignee: 'unknown',
    title: 'title',
    dueDate: new Date('1915-08-15 19:20:30'),
    tags: ['프론트', '백엔드', '프로젝트', '월요일', '좋아'],
    imageUrl: '/img/test_img.png',
  };

  return (
    <div className={styles.container}>
      <ColumnHeader name="할 일" />
      <div className={styles.addTaskButtonContainer}>
        <AddNewTaskBtn handleBtn={handleAddTaskBtn} />
      </div>
      <ColumnCard {...CardProps} />
      <ColumnCard {...CardProps2} />
      <ColumnCard {...CardProps} />
    </div>
  );
}

export default Column;
