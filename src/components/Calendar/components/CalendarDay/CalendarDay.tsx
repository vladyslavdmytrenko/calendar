import { DragEvent, FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { CalendarDayContainer } from './CalendarDay.styled.tsx';
import { CalendarTaskForm } from '@components/Calendar/components/CalendarTaskForm';
import { CalendarTask } from '@components/Calendar/components/CalendarTask';
import { Button } from '@components/Button';

import { calendarTaskActions } from '@/redux/reducers/CalendarTaskSlice.ts';
import {
  selectCalendarTasks,
  selectDragCard,
} from '@/redux/selectors/calendarTaskSelector.ts';
import { useAppDispatch } from '@/redux/store.ts';

import { getEnMonthName, isLastDayMonth, isSameMonth } from '@utils/date.ts';

interface ICalendarDay {
  date: Date;
  selectedDate: Date;
}

export const CalendarDay: FC<ICalendarDay> = ({ date, selectedDate }) => {
  const dispatch = useAppDispatch();
  const timestamp = date.getTime();
  const tasks = useSelector(selectCalendarTasks(timestamp));
  const dragTask = useSelector(selectDragCard);

  const [isHovering, setIsHovering] = useState(false);
  const [isCreatingNewTask, setIsCreatingNewTask] = useState(false);

  const day = date.getDate();
  const isSelectedMonth = isSameMonth(date, selectedDate);
  const isLastOrFirstDayMonth = isLastDayMonth(date) || date.getDate() === 1;

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handlerDragOver = (e: DragEvent) => {
    e.preventDefault();
  };
  const handlerDrop = (e: DragEvent) => {
    e.preventDefault();

    if (dragTask) {
      dispatch(calendarTaskActions.addTask({ timestamp, data: dragTask.data }));
      dispatch(
        calendarTaskActions.removeTask({
          timestamp: dragTask.timestamp,
          data: dragTask.data.id,
        })
      );
    }
  };

  const handleAddNewTaskClick = () => {
    setIsCreatingNewTask(true);
  };

  const handleCloseForm = () => {
    setIsCreatingNewTask(false);
  };

  return (
    <CalendarDayContainer
      isSelectedMonth={isSelectedMonth}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onDrop={handlerDrop}
      onDragOver={handlerDragOver}
    >
      <div>
        {day} {isLastOrFirstDayMonth && getEnMonthName(date)}
      </div>

      {tasks.map(task => (
        <CalendarTask key={task.id} task={task} date={date} />
      ))}

      {isHovering && !isCreatingNewTask && (
        <Button onClick={handleAddNewTaskClick}>Add new task</Button>
      )}

      {isCreatingNewTask && (
        <CalendarTaskForm timestamp={timestamp} onCloseForm={handleCloseForm} />
      )}
    </CalendarDayContainer>
  );
};
