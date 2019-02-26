import React, { Fragment } from 'react'
import { compose, graphql, Query } from 'react-apollo'

import { withWidth, withStyles, withTheme } from '@material-ui/core'

import AllVisits from 'graphql/AllVisits'
import VisitAddedSubscription from 'graphql/VisitAddedSubscription'
import VisitEditedSubscription from 'graphql/VisitEditedSubscription'
import AuthorizedVisitMutation from 'graphql/AuthorizedVisitMutation'

import { addNewItem, updateItem, debounce, isDesktop, deleteItem } from 'utils'

import { withError, withModalContext } from 'enhancers'

//Components
import RowItem from './RowItem'
import AccordionItem from './AccordionItem'
import Data from './Data'
import HeaderDiv from './HeaderDiv'
import TableWrapper from './TableWrapper'
import AccordionWrapper from './AccordionWrapper'
import Filters from './Filters'

//Common Components
import YesNo from '../common/Modal/YesNo'
import SnackbarInfo from '../common/SnackbarInfo'

import styles from './styles'
import { AUTHORIZED, PENDING } from '../../const'
import VisitDeletedSubscription from '../../graphql/VisitDeletedSubscription'

class YesNoDialog extends React.Component {
  render() {
    const {
      fullName,
      personId,
      details,
      goAlongWith,
      modal: { handleHideModal },
    } = this.props
    return (
      <YesNo
        handleOnSubmit={this.handleOnSubmit}
        handleHideModal={handleHideModal}
      >
        <span>
          Autorizar a <b style={{ color: this.primaryColor }}>{fullName}</b>
        </span>
        <br />
        <span>
          Cédula: <b style={{ color: this.primaryColor }}>{personId}</b>
        </span>
        {goAlongWith !== 0 && (
          <Fragment>
            <br />
            <span>
              Acompañantes:
              <b style={{ color: this.primaryColor }}>{goAlongWith}</b>
            </span>
          </Fragment>
        )}
        {details && (
          <Fragment>
            <br />
            <span>
              Detalles: <b style={{ color: this.primaryColor }}>{details}</b>
            </span>
          </Fragment>
        )}
      </YesNo>
    )
  }

  handleOnSubmit = () => {
    const {
      modal: { handleHideModal },
      mutate,
      id,
    } = this.props
    mutate({
      variables: { id },
      refetchQueries: [
        {
          query: AllVisits,
        },
      ],
    })
    handleHideModal()
  }
}

class VisitList extends React.Component {
  state = {
    status: PENDING,
    search: '',
  }

  primaryColor = this.props.theme.palette.primary.main

  handleAuthorization = props => () => {
    const { modal, mutate } = this.props
    modal.handleShowModal({
      maxWidth: 'sm',
      fullWidth: false,
      Component: () => <YesNoDialog {...props} mutate={mutate} modal={modal} />,
    })
  }

  handleSubscribe = subscribeToMore => [
    () =>
      addNewItem(
        subscribeToMore,
        VisitAddedSubscription,
        'visitAdded',
        'visits',
      ),
    () =>
      updateItem(
        subscribeToMore,
        VisitEditedSubscription,
        'visitEdited',
        'visits',
      ),
    () =>
      deleteItem(
        subscribeToMore,
        VisitDeletedSubscription,
        'visitDeleted',
        'visits',
      ),
  ]

  handleSwitchStatus = status => () => {
    this.setState({ status })
  }

  handleSearch = debounce(search => {
    this.setState({ search })
  }, 1000)

  render() {
    const { classes } = this.props

    const status = this.state.status ? { status: this.state.status } : {}
    const search = this.state.search ? { search: this.state.search } : {}

    return (
      <Query
        query={AllVisits}
        variables={{
          ...status,
          ...search,
        }}
        fetchPolicy="network-only"
      >
        {({
          data: { visits: oldVisits = [] },
          loading,
          subscribeToMore,
          error,
        }) => {
          const visits =
            this.state.status === PENDING
              ? oldVisits.filter(visit => visit.status !== AUTHORIZED)
              : oldVisits

          return (
            <React.Fragment>
              <HeaderDiv
                className={
                  visits && visits.length === 0 ? 'header-with-no-visits' : ''
                }
              >
                <div className="container-fluid">
                  <Filters
                    handleSearch={this.handleSearch}
                    handleSwitchStatus={this.handleSwitchStatus}
                    status={this.state.status}
                    classes={classes}
                  />
                </div>
              </HeaderDiv>
              <div
                className={
                  visits && visits.length === 0
                    ? 'body-with-no-visits'
                    : 'body-with-visits'
                }
              >
                <Data
                  loading={loading}
                  error={error}
                  list={visits}
                  subscribe={this.handleSubscribe(subscribeToMore)}
                  onAuthorization={this.handleAuthorization}
                  component={
                    isDesktop(this.props.width) ? RowItem : AccordionItem
                  }
                  wrapper={
                    isDesktop(this.props.width)
                      ? TableWrapper
                      : AccordionWrapper
                  }
                />
              </div>

              <SnackbarInfo />
            </React.Fragment>
          )
        }}
      </Query>
    )
  }
}

export default compose(
  withError,
  withWidth(),
  withStyles(styles),
  withTheme(),
  graphql(AuthorizedVisitMutation),
  withModalContext,
)(VisitList)
