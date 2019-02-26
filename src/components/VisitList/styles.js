const styles = theme => ({
  cssLabel: {
    color: '#FFF',
    '&$cssFocused': {
      color: '#FFF',
    },
  },
  cssFocused: {},
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#FFF',
    },
  },
  notchedOutline: {
    borderColor: '#FFF !important',
  },
  input: {
    color: '#FFF',
  },
  searchBtn: {
    borderColor: '#FFF',
    border: '1px solid',
    color: '#FFF',
    textTransform: 'capitalize',
  },
  searchBtnActive: {
    borderColor: '#FFF',
    border: '1px solid',
    backgroundColor: '#FFF',
    color: theme.palette.primary.main,
    fontWeight: 550,
    textTransform: 'capitalize',
    '&:hover': {
      borderColor: '#FFF',
      border: '1px solid',
      backgroundColor: '#FFF',
      color: theme.palette.primary.main,
    },
    '&:active': {
      borderColor: '#FFF',
      border: '1px solid',
      backgroundColor: '#FFF',
      color: theme.palette.primary.main,
    },
    '&:focus': {
      borderColor: '#FFF',
      border: '1px solid',
      backgroundColor: '#FFF',
      color: theme.palette.primary.main,
    },
  },
  marginNormal: {
    margin: 0,
  },
})

export default styles
