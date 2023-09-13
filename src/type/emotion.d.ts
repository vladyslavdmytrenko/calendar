import 'styled-components';

import { theme } from '@/constants';

type CustomTheme = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
