import {makeStyles} from '@mui/styles';

const useStyles = () =>  { return makeStyles({
    root: {
      backgroundColor: "#D41A2B",
      color: "#ffffff",
      height: "3rem",
      lineHeight: 1,
      "&:hover": {
        backgroundColor: "transparent",
        border: "1px solid #D41A2B",
        color: "#D41A2B",
        height: "3rem",
        padding: 0,
      },
    },
  })};

  export default useStyles;