import styled from '@emotion/styled';

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const StyledInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.dark7};
  color: ${({ theme }) => theme.colors.primaryText};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius(2)};
  line-height: 20px;
  outline: none;
  transition-duration: 85ms;
  padding: ${({ theme }) => theme.spacing(2)};
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.dangerText};
`;
