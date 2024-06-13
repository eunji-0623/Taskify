import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '/icon/calendar.svg';
import { Locale, format } from 'date-fns';
import styles from './Calendar.module.scss';

/*
  할 일 모달에서 사용하며 마감일(날짜와 시간)을 선택할 수 있습니다.

  prop으로 날짜, 시간을 받습니다.
*/

const koreanLocale = ko as unknown as Locale;

registerLocale('ko', koreanLocale);

interface CalendarProps {
  dueDate: string;
  setDueDate: React.Dispatch<React.SetStateAction<string>>;
}

function Calendar({ dueDate, setDueDate }: CalendarProps) {
  const handleDateChange = (date: Date | null) => {
    if (date) {
      const editData: string = format(date, 'yyyy-MM-dd HH:mm');
      setDueDate(editData);
    }
  };

  const parsedDeadline = dueDate ? new Date(dueDate) : null;

  return (
    <div className={styles.container}>
      <h3>마감일</h3>
      <DatePicker
        className={styles.calendarBlock}
        selected={parsedDeadline}
        locale="ko"
        onChange={handleDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="시간"
        dateFormat="yyyy년 MM월 dd일 HH:mm"
        minDate={new Date()}
      />
      <img className={styles.calendarImage} src={CalendarIcon} alt="달력 아이콘" />
    </div>
  );
}

export default Calendar;
