import { Calendar } from '@components/Calendar';
import { Global, ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';

import { Container } from './App.styled.tsx';
import { globalStyle } from '@/GlobalStyle.tsx';

import { store } from '@/redux/store.ts';

import { theme } from '@/constants';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />

        <Container>
          <Calendar />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
