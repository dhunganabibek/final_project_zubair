const styles = (theme) => ({
  inputWrapper: {
    marginBottom: theme.spacing(5),
    '& .MuiInputBase-input': {
      padding: theme.spacing(3, 4),
      width: 300,
      [theme.breakpoints.down('sm')]: {
        width: 230,
      },
    },
  },
});
export default styles;
