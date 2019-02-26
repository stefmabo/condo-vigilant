import React from 'react'
import PropTypes from 'prop-types'

import { withTheme } from '@material-ui/core'

const IconNextTo = ({
  icon,
  txt,
  containerClassName,
  iconClassName,
  txtClassName,
  theme,
}) => {
  return (
    <div className={`d-flex align-items-center pb-1 ${containerClassName}`}>
      <i
        style={{ color: theme.palette.primary.main }}
        className={`material-icons pr-1 ${iconClassName}`}
      >
        {icon}
      </i>
      <span className={txtClassName}>{txt}</span>
    </div>
  )
}

IconNextTo.propTypes = {
  icon: PropTypes.string.isRequired,
  txt: PropTypes.string,
  containerClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  txtClassName: PropTypes.string,
}

IconNextTo.defaultProps = {
  txt: 'It works',
  containerClassName: '',
  iconClassName: '',
}

export default withTheme()(IconNextTo)
