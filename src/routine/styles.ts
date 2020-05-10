import { createUseStyles } from "react-jss";
import { colors } from "../shared/colors";

export const useRoutineDetailsStyles = createUseStyles({
  routineDetails: {
    border: '1px solid black',
    padding: '10px',
    display: 'flex',
    'overflow-x': 'auto',
  },
  routineContent: {
    display: 'flex !important',
    flexWrap: 'nowrap !important',
    overflow: 'auto',
  },
  alternateRow: {
    backgroundColor: colors.lightGrey
  },
  scrollableRow: {
    display: 'flex !important',
    flexWrap: 'nowrap !important',
  },
  overflow: {
    overflow: 'auto',
  },
  columnFixed: {
    width: '195px',
    flex: '0 0 195px',
  },
  cell: {
    width: '195px',
    flex: '0 0 auto',
    borderBottom: '1px solid black',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  noExercises: {
    textAlign: 'center',
    padding: '10px'
  },
  actionBar: {
    padding: '10px 0',
    textAlign: 'right',
  }
});

export const useSelectorStyles = createUseStyles({
  templateBoxList: {
    'list-style-type': 'none',
    padding: '0.2em'
  },
  filter: {
    marginTop: 10
  }
});

export const useTemplateBoxStyles = createUseStyles({
  templateBox: {
    padding: '0.5em',
    '&:hover': {
      backgroundColor: colors.red,
      color: colors.white,
      cursor: 'pointer'
    }
  }
});