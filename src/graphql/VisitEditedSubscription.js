import gql from 'graphql-tag'

export default gql`
  subscription visitEdited {
    visitEdited {
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
