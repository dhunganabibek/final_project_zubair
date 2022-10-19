import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';

const theme = createMuiTheme({
  spacing: 4,
  palette: {
    primary: {
      light: teal[300],
      main: teal[700],
      dark: teal[900],
    },
  },
});

export default responsiveFontSizes(theme);
