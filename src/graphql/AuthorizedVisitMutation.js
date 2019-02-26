import gql from 'graphql-tag'

export default gql`
  mutation authorizeVisit($id: String) {
    authorizeVisit(id: $id) {
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
