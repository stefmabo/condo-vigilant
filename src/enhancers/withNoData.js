import React from 'react'
import image from '../assets/enterprise.svg'
import NoData from 'components/common/NoData'

export default function withNoData(Component) {
  return function({ list = [], noDataComponent: NoDataComponent, ...props }) {
    return list.length === 0 ? (
      NoDataComponent ? (
        <NoDataComponent />
      ) : (
        <NoData img={image} />
      )
    ) : (
      <Component {...props} list={list} />
    )
  }
}
