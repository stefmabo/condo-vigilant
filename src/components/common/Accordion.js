import React from 'react'
import { object, string, node } from 'prop-types'

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Icon,
} from '@material-ui/core'

const Accordion = ({ titleStyle, title, children }) => {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
        <Typography style={titleStyle}>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

Accordion.propTypes = {
  titleStyle: object,
  title: string.isRequired,
  children: node.isRequired,
}

export default Accordion
