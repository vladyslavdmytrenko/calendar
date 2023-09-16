import styled from '@emotion/styled';

export const CalendarHeaderContainer = styled.div`
  display: flex;
  align-items: start;
  gap: ${({ theme }) => theme.spacing(8)};
  margin-block: ${({ theme }) => theme.spacing(2)};
`;

export const CalendarHeaderTitle = styled.h1``;

export const CalendarHeaderText = styled.span``;

export const CalendarFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  gap: ${({ theme }) => theme.spacing(2)};
`;
