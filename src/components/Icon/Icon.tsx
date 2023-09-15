import { FC } from 'react';
import { EMOJI_SYMBOLS } from '@data-models/enums/emojis.enum.ts';
import { StyledIcon } from '@components/Icon/Icon.styled.tsx';

export interface IIcon {
  icon: EMOJI_SYMBOLS;
}

export const Icon: FC<IIcon> = ({ icon }) => {
  return <StyledIcon>{icon}</StyledIcon>;
};
