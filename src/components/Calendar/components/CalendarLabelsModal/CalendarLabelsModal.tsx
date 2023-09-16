import { FC } from 'react';

import {
  CalendarLabelsModalBlur,
  CalendarLabelsModalContainer,
  CalendarLabelsModalFormContainer,
} from '@components/Calendar/components/CalendarLabelsModal/CalendarLabelsModal.styled.tsx';
import { CalendarLabelsForm } from '@components/Calendar/components/CalendarLabelsForm';

export interface ICalendarModal {
  isShow: boolean;
  onHideModal: () => void;
}

export const CalendarLabelsModal: FC<ICalendarModal> = ({
  onHideModal,
  isShow,
}) => {
  const handleClick = () => {
    onHideModal();
  };

  return (
    <CalendarLabelsModalContainer isShow={isShow}>
      <CalendarLabelsModalBlur onClick={handleClick} />

      <CalendarLabelsModalFormContainer>
        <CalendarLabelsForm onCloseForm={onHideModal} />
      </CalendarLabelsModalFormContainer>
    </CalendarLabelsModalContainer>
  );
};
