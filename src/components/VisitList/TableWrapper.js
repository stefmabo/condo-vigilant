import { Paper } from '@material-ui/core'
import Table from './Table'
import React from 'react'

const TableWrapper = ({ children }) => (
  <Paper className="d-none d-lg-block">
    <Table>{children}</Table>
  </Paper>
)

export default TableWrapper
