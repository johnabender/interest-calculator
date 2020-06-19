import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  inputItemRow: {
    margin: theme.spacing(0),
  },

  sliderItem: {
    [theme.breakpoints.down('xs')]: {
      "margin-left": 0,
      "margin-right": 0,
      "margin-bottom": "-8px",
    },
    [theme.breakpoints.up('md')]: {
      textAlign: "right",
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: "center",
    },
  },
  slider: {
    width: "75%",
    [theme.breakpoints.down('xs')]: {
      width: "100%",
    },
  },

  textFieldItem: {
    textAlign: "right",
    [theme.breakpoints.up('md')]: {
      textAlign: "left",
    },
    [theme.breakpoints.down('xs')]: {
      "margin-bottom": "25px",
    },
  },
  textField: {
    width: "100%",
    [theme.breakpoints.down('sm')]: {
      width: "10rem",
    },
    [theme.breakpoints.down('xs')]: {
      width: "9rem",
    },
  },

  radioButtonItem: {
    textAlign: "left",
  },
  radioButton: {
    padding: "5px",
  },

  hidden: {
    display: "none",
  },

  cyanBg: {
    background: "cyan",
  },
  magentaBg: {
    background: "magenta",
  },
  yellowBg: {
    background: "yellow",
  },
  greenBg: {
    background: "#00ff00",
  },
}));
