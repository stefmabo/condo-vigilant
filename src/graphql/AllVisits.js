import gql from 'graphql-tag'

export default gql`
  query Visits($status: Status, $search: String, $entryDate: String) {
    visits(status: $status, search: $search, entryDate: $entryDate) {
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
