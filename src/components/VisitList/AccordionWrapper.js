import React from 'react'

const AccordionWrapper = ({ children }) => (
  <div style={{ paddingBottom: '6em' }} className={`d-show d-lg-none`}>
    {children}
  </div>
)

export default AccordionWrapper
