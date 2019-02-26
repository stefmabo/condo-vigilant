import React from 'react'
import { func, string } from 'prop-types'
import { TableCell, TableRow, withTheme } from '@material-ui/core'

import 'moment/locale/es'
import { AUTHORIZED, DELETED } from '../../const'

const RowItem = ({
  onAuthorization,
  id,
  fullName,
  personId,
  carPlate,
  entryDate,
  houseToVisit,
  status,
  details,
  goAlongWith,
  theme,
}) => {
  const isAuthorized = status === AUTHORIZED
  const isDeleted = status === DELETED

  const errorStyle = isDeleted ? { color: theme.palette.primary.error } : {}

  return (
    <TableRow
      hover
      className="pointer"
      style={!isAuthorized ? { cursor: 'pointer' } : {}}
      onClick={
        onAuthorization && !isAuthorized
          ? onAuthorization({
              id,
              fullName,
              personId,
              details,
              goAlongWith,
            })
          : null
      }
    >
      <TableCell style={errorStyle}>{fullName}</TableCell>
      <TableCell style={errorStyle} align="center">
        {carPlate ? carPlate : '-'}
      </TableCell>
      <TableCell style={errorStyle} align="center">
        {personId}
      </TableCell>
      <TableCell style={errorStyle} align="center">
        {houseToVisit}
      </TableCell>
      <TableCell style={errorStyle} align="right">
        <i className="material-icons">{isAuthorized ? 'done' : 'clear'}</i>
      </TableCell>
    </TableRow>
  )
}

RowItem.propTypes = {
  onAuthorization: func.isRequired,
  id: string.isRequired,
  fullName: string.isRequired,
  personId: string.isRequired,
  carPlate: string,
  entryDate: string.isRequired,
  houseToVisit: string.isRequired,
  status: string.isRequired,
}

export default withTheme()(RowItem)
