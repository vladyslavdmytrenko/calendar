import { FC, useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import {
  ButtonContainer,
  TaskForm,
} from '@components/Calendar/components/CalendarTaskForm/CalendarTaskForm.styled.tsx';
import { InputField } from '@components/InputField';
import { Button } from '@components/Button';
import { Icon } from '@components/Icon';
import { LabelFieldContainer } from '@components/Calendar/components/CalendarLabelsForm/CalendarLabelsForm.styled.tsx';
import { styleInputColor } from '@/GlobalStyle.tsx';

import { calendarLabelsValidationSchema } from './calendarLabelsForm.validation.ts';
import { useAppDispatch } from '@/redux/store.ts';
import { calendarTaskActions } from '@/redux/reducers/CalendarTaskSlice.ts';
import { selectCalendarLabels } from '@/redux/selectors/calendarTaskSelector.ts';
import { getRandomColor } from '@utils/calendar.ts';

import { EMOJI_SYMBOLS } from '@data-models/enums/emojis.enum.ts';
import { BUTTON_TYPES } from '@data-models/enums/button.enum.ts';

interface ICalendarLabelsForm {
  onCloseForm: () => void;
}

export const CalendarLabelsForm: FC<ICalendarLabelsForm> = ({
  onCloseForm,
}) => {
  const labels = useSelector(selectCalendarLabels);
  const dispatch = useAppDispatch();
  const methods = useForm({
    defaultValues: {
      labels: [],
    },
    resolver: yupResolver(calendarLabelsValidationSchema),
  });

  const { fields, append, replace } = useFieldArray({
    control: methods.control,
    name: 'labels',
  });

  const [isLockLabels, setIsLockLabels] = useState<boolean[]>([]);

  const [isInitializeForm, setIsInitializeForm] = useState(false);

  useEffect(() => {
    if (!isInitializeForm && labels.length && methods) {
      methods.setValue(
        `labels`,
        labels.map(({ title, color, id }) => ({
          title,
          color,
          storeId: id,
        }))
      );

      setIsLockLabels(Array(labels.length).fill(true));

      setIsInitializeForm(true);
    }
  }, [labels, isInitializeForm, methods, isLockLabels]);
  const handleSaveLabel = (index: number) => () => {
    const field = methods.getValues(`labels.${index}`);

    if (field.storeId) {
      dispatch(
        calendarTaskActions.updateLabel({
          id: field.storeId,
          color: field.color,
          title: field.title,
        })
      );
      onChangeIsLock(index, true);

      return;
    }

    const newTaskLabel = {
      id: nanoid(),
      color: field.color,
      title: field.title,
    };

    dispatch(calendarTaskActions.addLabel(newTaskLabel));

    replace(
      fields.map((field, filedIndex) => {
        if (index === filedIndex) {
          return {
            color: newTaskLabel.color,
            title: newTaskLabel.title,
            storeId: newTaskLabel.id,
          };
        }

        return field;
      })
    );

    onChangeIsLock(index, true);
  };

  const handleRemoveField = (fieldId: string) => () => {
    dispatch(calendarTaskActions.removeLabel(fieldId));

    replace(fields.filter(item => item.storeId !== fieldId));
  };

  const handleAddField = () => {
    setIsInitializeForm(true);
    append({ color: getRandomColor(), title: '' });
    setIsLockLabels([...isLockLabels, false]);
  };

  const onChangeIsLock = (indexLabel: number, statusLabel: boolean) => {
    setIsLockLabels(current =>
      current.map((status, index) => {
        if (index === indexLabel) {
          return statusLabel;
        }

        return status;
      })
    );
  };

  const onSubmit = () => {};

  return (
    <FormProvider {...methods}>
      <TaskForm onSubmit={methods.handleSubmit(onSubmit)}>
        <ButtonContainer>
          <Button onClick={onCloseForm} variant={BUTTON_TYPES.ICON}>
            <Icon icon={EMOJI_SYMBOLS.CLOSE} />
          </Button>
        </ButtonContainer>

        {fields.map((field, index) => (
          <LabelFieldContainer key={field.id}>
            <input
              type='color'
              css={styleInputColor}
              {...methods.register(`labels.${index}.color`)}
              disabled={isLockLabels[index]}
            />

            <InputField
              {...methods.register(`labels.${index}.title`)}
              disabled={isLockLabels[index]}
            />

            {isLockLabels[index] && (
              <Button
                onClick={() => onChangeIsLock(index, false)}
                variant={BUTTON_TYPES.ICON}
              >
                <Icon icon={EMOJI_SYMBOLS.EDIT} />
              </Button>
            )}

            {!isLockLabels[index] && (
              <>
                <Button
                  onClick={handleSaveLabel(index)}
                  variant={BUTTON_TYPES.ICON}
                >
                  <Icon icon={EMOJI_SYMBOLS.CHECK_MARK} />
                </Button>

                <Button
                  onClick={handleRemoveField(field.storeId || '')}
                  variant={BUTTON_TYPES.ICON}
                >
                  <Icon icon={EMOJI_SYMBOLS.DELETE} />
                </Button>
              </>
            )}
          </LabelFieldContainer>
        ))}

        <Button
          onClick={handleAddField}
          variant={BUTTON_TYPES.TEXT}
          disabled={isLockLabels.includes(false)}
        >
          Add new label
        </Button>
      </TaskForm>
    </FormProvider>
  );
};
