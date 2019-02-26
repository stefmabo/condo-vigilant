import React from 'react'
import { func, string } from 'prop-types'
import moment from 'moment'
import { Button } from '@material-ui/core'

import { AUTHORIZED } from 'const'

import IconNextTo from '../common/IconNextTo'
import Accordion from '../common/Accordion'

import 'moment/locale/es'

const AccordionItem = ({
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
}) => {
  const isAuthorized = status === AUTHORIZED

  return (
    <Accordion title={fullName}>
      <div className="d-flex flex-column">
        {carPlate && <IconNextTo icon="directions_car" txt={carPlate} />}
        <IconNextTo icon="assignment_ind" txt="Número de cédula" />
        <IconNextTo
          icon="date_range"
          txt={moment(new Date(entryDate)).format('h:mm:ss', 'es')}
        />
        <IconNextTo icon="home" txt={houseToVisit} />
        <IconNextTo
          icon={isAuthorized ? 'done' : 'clear'}
          txt={'Autorizado'}
          containerClassName="flex-row-reverse flex-start justify-content-end"
        />
        {!isAuthorized && (
          <Button
            color="primary"
            variant="contained"
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
            Autorizar
          </Button>
        )}
      </div>
    </Accordion>
  )
}

AccordionItem.propTypes = {
  onAuthorization: func.isRequired,
  id: string.isRequired,
  fullName: string.isRequired,
  personId: string.isRequired,
  carPlate: string,
  entryDate: string.isRequired,
  houseToVisit: string.isRequired,
  status: string.isRequired,
}

export default AccordionItem
