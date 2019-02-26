import React from 'react'
import classNames from 'classnames'
import { Snackbar, SnackbarContent, withStyles } from '@material-ui/core'
import { compose } from 'react-apollo'
import { withIsConnected } from 'enhancers'

const styles = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  success: {
    backgroundColor: theme.palette.primary.success,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
})

const SnackbarInfo = ({ message, classes, isConnected }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    open
  >
    <SnackbarContent
      className={isConnected ? classes.success : classes.error}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <i
            className={`material-icons ${classNames(
              classes.icon,
              classes.iconVariant,
            )}`}
          >
            {isConnected ? 'cloud' : 'cloud_off'}
          </i>
          {isConnected
            ? 'Usted está conectado a Internet'
            : 'No hay conexión a Internet'}
        </span>
      }
    />
  </Snackbar>
)

export default compose(
  withStyles(styles),
  withIsConnected,
)(SnackbarInfo)
