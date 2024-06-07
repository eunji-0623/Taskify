import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '/icon/calendar.svg';
import { Locale } from 'date-fns';
import styles from './Calendar.module.scss';

const koreanLocale = ko as unknown as Locale;

registerLocale('ko', koreanLocale);

interface CalendarProps {
  deadline: Date | null;
  setDeadline: React.Dispatch<React.SetStateAction<Date | null>>;
}

function Calendar({ deadline, setDeadline }: CalendarProps) {
  const handleDateChange = (date: Date | null) => {
    setDeadline(date); // 날짜 객체 그대로 전달
  };

  return (
    <div className={styles.container}>
      <DatePicker
        className={styles.calendarBlock}
        selected={deadline}
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
