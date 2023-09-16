import { FC, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toPng } from 'html-to-image';

import {
  CalendarContainer,
  CalendarDayName,
  DayContainer,
} from '@components/Calendar/Calendar.styled.tsx';
import { CalendarDay } from '@components/Calendar/components/CalendarDay';
import { CalendarHeader } from '@components/Calendar/components/CalendarHeader';

import {
  generateDateListByRange,
  getDateRangeByDate,
} from '@utils/calendar.ts';
import { getDateSting } from '@utils/date.ts';

import { WEEK_DAYS } from '@/constants';
import {
  selectCalendarAllTask,
  selectCalendarLabels,
} from '@/redux/selectors/calendarTaskSelector.ts';

interface ICalendar {}

export const Calendar: FC<ICalendar> = () => {
  const labels = useSelector(selectCalendarLabels);
  const tasks = useSelector(selectCalendarAllTask);
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedDate] = useState(new Date(getDateSting()));

  const handleDownloadImage = async () => {
    if (containerRef.current === null) {
      return;
    }

    const dataUrl = await toPng(containerRef.current, { cacheBust: true });

    const link = document.createElement('a');
    link.download = 'calendar.png';
    link.href = dataUrl;
    link.click();
  };

  const handleExportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify({ labels, tasks })
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'data.json';

    link.click();
  };

  const selectedRange = getDateRangeByDate(new Date(selectedDate));
  const listDate = generateDateListByRange(selectedRange);

  return (
    <>
      <CalendarHeader
        onDownloadImage={handleDownloadImage}
        onExportData={handleExportData}
      />

      <CalendarContainer ref={containerRef}>
        <DayContainer>
          {WEEK_DAYS.map(day => (
            <CalendarDayName key={day}>{day}</CalendarDayName>
          ))}
        </DayContainer>

        <DayContainer>
          {listDate.map(({ date }) => (
            <CalendarDay
              key={date.toString()}
              dayDate={date}
              selectedDate={selectedDate}
            />
          ))}
        </DayContainer>
      </CalendarContainer>
    </>
  );
};
