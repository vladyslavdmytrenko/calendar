export const theme = {
  colors: {
    dark1: '#1D2125',
    dark2: '#A1BDD914',
    dark3: '#A6C5E229',
    dark5: '#282E33',
    dark6: '#22272B',
    dark7: '#161A1D',
    blue1: '#092957',
    blue2: '#09326C',
    primaryText: '#B6C2CF',
    secondaryText: '#9FADBC',
    dangerText: '#CA3521',
    blueText: '#579DFF',
  },
  spacing: (value: number) => `${4 * value}px`,
  borderRadius: (value: number) => `${1.5 * value}px`,
  zIndexes: {
    inlineEditor: 1,
  },
};
