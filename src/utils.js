import React from 'react'
import { DELETED } from './const'

export const renderComponentWithMap = (Component, key, newParameters) => (
  item,
  index,
) => {
  let props = { ...item }

  if (typeof item !== 'object') {
    props = { name: item }
  }

  return (
    <Component key={props[key]} {...props} {...newParameters} index={index} />
  )
}

// Subscriptions

export const addNewItem = (
  subscribeToMore,
  graphQLSubscription,
  subscriptionKey,
  objectToUpdate,
) =>
  subscribeToMore({
    document: graphQLSubscription,
    updateQuery: (prev, { subscriptionData }) => {
      const newItem = subscriptionData.data[subscriptionKey]

      const test = Object.assign({}, prev, {
        [objectToUpdate]: [newItem, ...prev[objectToUpdate]],
      })

      return test
    },
  })

export const deleteItem = (
  subscribeToMore,
  graphQLSubscription,
  subscriptionKey,
  objectToUpdate,
) =>
  subscribeToMore({
    document: graphQLSubscription,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev

      const newArray = prev[objectToUpdate].filter(
        item => subscriptionData.data[subscriptionKey].id !== item.id,
      )

      return { [objectToUpdate]: newArray }
    },
  })

export const updateItem = (
  subscribeToMore,
  graphQLSubscription,
  subscriptionKey,
  objectToUpdate,
) =>
  subscribeToMore({
    document: graphQLSubscription,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev

      const items = prev[objectToUpdate] || []

      const newArray = items
        .filter(x => x.status !== DELETED)
        .map(x => (x.id === subscriptionData.id ? subscriptionData : x))

      return { [objectToUpdate]: newArray }
    },
  })

// End Subscriptions

export const debounce = (fn, time) => {
  let timeout

  return function() {
    const functionCall = () => fn.apply(this, arguments)

    clearTimeout(timeout)
    timeout = setTimeout(functionCall, time)
  }
}

export const isDesktop = width => ['lg', 'xl'].includes(width)
