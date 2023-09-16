import styled from '@emotion/styled';
import { ICalendarModal } from './CalendarLabelsModal.tsx';

interface ICalendarLabelsModalContainer
  extends Pick<ICalendarModal, 'isShow'> {}
export const CalendarLabelsModalContainer = styled.div<ICalendarLabelsModalContainer>`
  display: ${({ isShow }) => (isShow ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${({ theme }) => theme.zIndexes.modal};
`;

export const CalendarLabelsModalBlur = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  backdrop-filter: blur(10px);
  height: 100vh;
`;

export const CalendarLabelsModalFormContainer = styled.div`
  position: relative;
  top: calc(50% - 200px);
  left: calc(50% - 250px);
  width: 400px;
  height: 500px;
  z-index: ${({ theme }) => theme.zIndexes.modal + 1};
`;
