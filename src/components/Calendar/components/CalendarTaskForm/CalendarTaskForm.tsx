import { FC, useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { CalendarLabelsModal } from '@components/Calendar/components/CalendarLabelsModal';

import { Button } from '@components/Button';
import {
  ButtonContainer,
  StyledCheckbox,
  StyledLabelContainer,
  TaskForm,
} from '@components/Calendar/components/CalendarTaskForm/CalendarTaskForm.styled.tsx';
import { InputField } from '@components/InputField';
import { Icon } from '@components/Icon';
import { styleInputColor } from '@/GlobalStyle.tsx';

import { calendarTaskValidationSchema } from './calendarTaskForm.validation.ts';

import { useAppDispatch } from '@/redux/store.ts';
import { calendarTaskActions } from '@/redux/reducers/CalendarTaskSlice.ts';
import { selectCalendarLabels } from '@/redux/selectors/calendarTaskSelector.ts';

import { EMOJI_SYMBOLS } from '@data-models/enums/emojis.enum.ts';
import { BUTTON_TYPES } from '@data-models/enums/button.enum.ts';
import { Task, TaskAction, TaskLabel } from '@data-models/task.ts';

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
  const dispatch = useAppDispatch();
  const labels = useSelector(selectCalendarLabels);
  const methods = useForm({
    values: {
      title: editTask?.data.title || '',
      labels: editTask?.data.labels?.map(label => ({
        ...label,
        checked: true,
      })),
    },
    resolver: yupResolver(calendarTaskValidationSchema),
  });
  const { fields, replace } = useFieldArray({
    control: methods.control,
    name: 'labels',
  });
  const [isShowModalLabels, setIsShowModalLabels] = useState(false);

  useEffect(() => {
    if (labels.length !== fields.length) {
      replace(
        labels.map((label, index) => {
          const result = { ...label, checked: false };
          if (fields[index]?.checked) {
            result.checked = true;
          }

          return result;
        })
      );
    }
  }, [fields, labels, replace]);

  const handleClose = () => {
    onCloseForm();
  };

  const onSubmit = ({
    title,
    labels,
  }: yup.InferType<typeof calendarTaskValidationSchema>) => {
    const labelTask: TaskLabel[] =
      labels
        ?.filter(label => label.checked)
        .map(label => ({
          id: label.id || '',
          color: label.color,
          title: label.title,
        })) || [];

    if (editTask) {
      dispatch(
        calendarTaskActions.updateTask({
          timestamp: editTask.timestamp,
          data: {
            ...editTask.data,
            labels: labelTask,
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
          labels: labelTask,
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

  const changeShowLabelsForm = (isShow: boolean) => () =>
    setIsShowModalLabels(isShow);

  return (
    <>
      <FormProvider {...methods}>
        <TaskForm onSubmit={methods.handleSubmit(onSubmit)}>
          <span>Labels</span>

          <StyledLabelContainer>
            {fields.map((field, index) => (
              <StyledCheckbox
                key={field.id}
                type='checkbox'
                css={styleInputColor}
                color={field.color}
                {...methods.register(`labels.${index}.checked`)}
              />
            ))}

            <Button
              variant={BUTTON_TYPES.ICON}
              onClick={changeShowLabelsForm(true)}
            >
              <Icon icon={EMOJI_SYMBOLS.PLUS} />
            </Button>
          </StyledLabelContainer>

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

      <CalendarLabelsModal
        isShow={isShowModalLabels}
        onHideModal={changeShowLabelsForm(false)}
      />
    </>
  );
};
