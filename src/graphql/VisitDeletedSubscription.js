import gql from 'graphql-tag'

export default gql`
  subscription visitDeleted {
    visitDeleted {
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
