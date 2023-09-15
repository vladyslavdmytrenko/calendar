import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@components/Button';
import {
  ButtonContainer,
  TaskForm,
} from '@components/Calendar/components/CalendarTaskForm/CalendarTaskForm.styled.tsx';
import { InputField } from '@components/InputField';
import { Icon } from '@components/Icon';

import { calendarTaskValidationSchema } from './calendarTaskForm.validation.ts';
import { useAppDispatch } from '@/redux/store.ts';
import { calendarTaskActions } from '@/redux/reducers/CalendarTaskSlice.ts';

import { EMOJI_SYMBOLS } from '@data-models/enums/emojis.enum.ts';
import { BUTTON_TYPES } from '@data-models/enums/button.enum.ts';
import { Task, TaskAction } from '@data-models/task.ts';

interface ICalendarNewTask {
  onCloseForm: () => void;
  timestamp: number;
  editTask?: TaskAction<Task>;
}

export const CalendarTaskForm: FC<ICalendarNewTask> = ({
  timestamp,
  onCloseForm,
  editTask,
}) => {
  const methods = useForm({
    values: {
      title: editTask?.data.title || '',
    },
    resolver: yupResolver(calendarTaskValidationSchema),
  });
  const dispatch = useAppDispatch();

  const handleClose = () => {
    onCloseForm();
  };

  const onSubmit = ({
    title,
  }: yup.InferType<typeof calendarTaskValidationSchema>) => {
    if (editTask) {
      dispatch(
        calendarTaskActions.updateTask({
          timestamp: editTask.timestamp,
          data: {
            ...editTask.data,
            title,
          },
        })
      );

      onCloseForm();
      return;
    }

    dispatch(
      calendarTaskActions.addTask({
        timestamp,
        data: {
          title,
        },
      })
    );

    onCloseForm();
  };

  const handleDelete = () => {
    dispatch(
      calendarTaskActions.removeTask({
        timestamp,
        data: editTask?.data.id || '',
      })
    );
  };

  return (
    <FormProvider {...methods}>
      <TaskForm onSubmit={methods.handleSubmit(onSubmit)}>
        <InputField name='title' label='Task name' />

        <ButtonContainer>
          <Button type='submit' variant={BUTTON_TYPES.ICON}>
            <Icon icon={EMOJI_SYMBOLS.CHECK_MARK} />
          </Button>

          {editTask && (
            <Button
              type='submit'
              variant={BUTTON_TYPES.ICON}
              onClick={handleDelete}
            >
              <Icon icon={EMOJI_SYMBOLS.DELETE} />
            </Button>
          )}

          <Button onClick={handleClose} variant={BUTTON_TYPES.ICON}>
            <Icon icon={EMOJI_SYMBOLS.CLOSE} />
          </Button>
        </ButtonContainer>
      </TaskForm>
    </FormProvider>
  );
};
