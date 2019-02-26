import React from 'react'

import {
  Table as MaterialTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'

const Table = ({ children }) => {
  return (
    <div>
      <MaterialTable>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="center">Placa</TableCell>
            <TableCell align="center">Cédula</TableCell>
            <TableCell align="center">Casa</TableCell>
            <TableCell align="right">Autorización</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </MaterialTable>
    </div>
  )
}

export default Table
