import React, { Component, createContext } from 'react'
import Dialog from '@material-ui/core/Dialog'

export const ModalContext = createContext({
  Component: null,
  isShow: false,
  handleShowModal: () => {},
  handleHideModal: () => {},
  handleDestroyModal: () => {},
})

export class ModalProvider extends Component {
  handleShowModal = ({ Component, maxWidth, fullWidth }) => {
    this.setState({
      Component,
      isShow: true,
      maxWidth,
      fullWidth,
    })
  }

  handleHideModal = () => {
    this.setState({
      isShow: false,
    })
  }

  handleDestroyModal = () => {
    this.setState({
      component: null,
    })
  }

  state = {
    Component: () => <div />,
    isShow: false,
    handleShowModal: this.handleShowModal,
    handleHideModal: this.handleHideModal,
    handleDestroyModal: this.handleDestroyModal,
  }

  render() {
    const {
      Component,
      handleDestroyModal,
      isShow,
      fullWidth,
      maxWidth,
    } = this.state
    return (
      <ModalContext.Provider value={this.state}>
        <Dialog
          onExited={handleDestroyModal}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={isShow}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {Component && <Component />}
        </Dialog>
        {this.props.children}
      </ModalContext.Provider>
    )
  }
}

export const ModalConsumer = ModalContext.Consumer
