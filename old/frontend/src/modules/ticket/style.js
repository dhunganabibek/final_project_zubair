const styles = ((theme) => ({
  wrapper: {
    display: 'flex',
    width: '97%',
    padding: 20,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      width: '85%',
    },
    '& MuiOutlinedInput-root': {
      width: '95%',
    },
  },
  formWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  label: {
    width: 235,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  selectRoot: {
    width: 300,
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      width: 250,
    },
  },
  selectOutlined: {
    height: 40,

  },
  input: {
    width: 340,
    padding: 10,
    height: 40,
    [theme.breakpoints.down('sm')]: {
      width: 290,
    },
  },
  form: {
    marginBottom: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  header: {
    marginBottom: 20,
  },
  textArea: {
    width: 340,
    height: 120,
    [theme.breakpoints.down('sm')]: {
      width: 290,
    },
  },
  inputHeight: {
    // height: 40,
  },
}));

export default styles;
