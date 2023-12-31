import { css } from '@emotion/react';
import { theme } from '@/constants';

export const globalStyle = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
  }

  body {
    line-height: 1;
    color: ${theme.colors.primaryText};
    background: ${theme.colors.dark1};
  }

  ol,
  ul {
    list-style: none;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.dark6};
  }
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primaryText};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const styleInputColor = css`
  -webkit-appearance: none;
  border: none;
  background-color: transparent;
  overflow: hidden;
  outline: none;
  cursor: inherit;
  padding: 0;
  border-radius: ${theme.spacing(2)};
`;
