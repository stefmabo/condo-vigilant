import React from 'react'
import Spinner from 'components/common/Spinner'

export default function withLoading(Component) {
  return function({ loading, list = [], ...props }) {
    return loading && list.length === 0 ? (
      <Spinner />
    ) : (
      <Component {...props} list={list} />
    )
  }
}
