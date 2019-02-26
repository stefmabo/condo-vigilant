import React, { Fragment } from 'react'
import {
  Button,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core'

const TITLE = 'Información'

const YesNo = ({ children, handleHideModal, handleOnSubmit }) => (
  <Fragment>
    <DialogTitle id="alert-dialog-title">
      <span className="color-primary">{TITLE}</span>
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        {children}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleHideModal} color="primary">
        No
      </Button>
      <Button onClick={handleOnSubmit} color="primary" autoFocus>
        Sí
      </Button>
    </DialogActions>
  </Fragment>
)

export default YesNo
