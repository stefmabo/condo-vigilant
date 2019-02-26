import gql from 'graphql-tag'

export default gql`
  subscription visitAdded {
    visitAdded {
      id
      fullName
      personId
      carPlate
      entryDate
      houseToVisit
      status
      details
      goAlongWith
    }
  }
`
