import styled from '@emotion/styled';

export const TaskForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.dark6};
  padding: ${({ theme }) => theme.spacing(2)};
  gap: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.borderRadius(2)};
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-left: auto;
  gap: ${({ theme }) => theme.spacing(1)};
`;
