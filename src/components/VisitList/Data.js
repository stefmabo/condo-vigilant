import React from 'react'
import { renderComponentWithMap } from 'utils'
import { array } from 'prop-types'
import { withLoading, withError } from 'enhancers'
import { compose } from 'react-apollo'
import image from '../../assets/enterprise.svg'
import NoData from 'components/common/NoData'

class Data extends React.Component {
  subscribedItems = []

  componentDidMount() {
    this.props.subscribe.forEach(
      fn => (this.subscribedItems = [...this.subscribedItems, fn()]),
    )
  }

  componentWillUnmount() {
    this.subscribedItems.forEach(fn => fn())
  }

  render() {
    const { list, component, wrapper: Wrapper, onAuthorization } = this.props

    return list.length !== 0 ? (
      <div className="data-container">
        <div className="container-fluid">
          <Wrapper>
            {list.map(
              renderComponentWithMap(component, 'id', {
                onAuthorization,
              }),
            )}
          </Wrapper>
        </div>
      </div>
    ) : (
      <NoData img={image} />
    )
  }
}

Data.propTypes = {
  subscribe: array.isRequired,
  list: array.isRequired,
}

Data.defaultProps = {
  subscribe: [() => {}],
  list: [],
  wrapper: ({ children }) => <div>{children}</div>,
}

export default compose(
  withError,
  withLoading,
)(Data)
