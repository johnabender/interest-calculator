export const useStyles = (theme) => ({
  textField: {
    width: "100%",
    [theme.breakpoints.down('sm')]: {
      width: "10rem",
    },
    [theme.breakpoints.down('xs')]: {
      width: "9rem",
    },
  },
});
