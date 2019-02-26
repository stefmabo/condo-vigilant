import React from 'react'
import { string } from 'prop-types'

const NoData = ({ img }) => (
  <div className="no-data-container">
    <img
      alt="no data"
      width="200"
      style={{ opacity: 0.6, margin: '0 auto' }}
      src={img}
    />
    <span
      className="pt-2 pb-3"
      style={{ color: '#888888', textAlign: 'center' }}
    >
      No hay datos a mostrar
    </span>
  </div>
)

NoData.propTypes = {
  img: string.isRequired,
}

export default NoData
