import { DragEvent, FC, useState } from 'react';

import {
  CalendarTaskContainer,
  CalendarTaskHeader,
  CalendarTaskTitle,
} from '@components/Calendar/components/CalendarTask/CalnedarTask.styled.tsx';
import { Button } from '@components/Button';
import { Icon } from '@components/Icon';

import { useAppDispatch } from '@/redux/store.ts';
import { calendarTaskActions } from '@/redux/reducers/CalendarTaskSlice.ts';

import { Task } from '@data-models/task.ts';

import { BUTTON_TYPES } from '@data-models/enums/button.enum.ts';
import { EMOJI_SYMBOLS } from '@data-models/enums/emojis.enum.ts';
import { CalendarTaskForm } from '@components/Calendar/components/CalendarTaskForm';

export interface ICalendarTask {
  task: Task;
  date: Date;
}

export const CalendarTask: FC<ICalendarTask> = ({ date, task }) => {
  const dispatch = useAppDispatch();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handlerDragStart = (task: Task) => (e: DragEvent) => {
    console.log('drag start', e, task);
    dispatch(
      calendarTaskActions.setDragCard({
        timestamp: date.getTime(),
        data: task,
      })
    );
  };
  const handlerDragEnd = () => {
    isDragOver && setIsDragOver(false);
  };

  const handlerDragOver = (e: DragEvent) => {
    e.preventDefault();
    !isDragOver && setIsDragOver(true);
  };
  const handlerDrop = (task: Task) => (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      calendarTaskActions.changeTaskPlace({
        timestamp: date.getTime(),
        data: task,
      })
    );
  };

  const handleEditClick = () => setIsEditing(true);
  const handleCloseForm = () => setIsEditing(false);

  return (
    <>
      {!isEditing && (
        <CalendarTaskContainer
          isDragOver={isDragOver}
          draggable={true}
          onDragStart={handlerDragStart(task)}
          onDragEnd={handlerDragEnd}
          onDragLeave={handlerDragEnd}
          onDragOver={handlerDragOver}
          onDrop={handlerDrop(task)}
        >
          <CalendarTaskHeader>
            <CalendarTaskTitle>{task.title}</CalendarTaskTitle>

            <Button variant={BUTTON_TYPES.ICON} onClick={handleEditClick}>
              <Icon icon={EMOJI_SYMBOLS.EDIT} />
            </Button>
          </CalendarTaskHeader>
        </CalendarTaskContainer>
      )}

      {isEditing && (
        <CalendarTaskForm
          timestamp={date.getTime()}
          onCloseForm={handleCloseForm}
          editTask={{ timestamp: date.getTime(), data: task }}
        />
      )}
    </>
  );
};
