import { TextField } from '@material-ui/core'
import React from 'react'
import FilterBtn from './FilterBtn'
import { AUTHORIZED, PENDING } from '../../const'

const Filters = ({ handleSearch, status, handleSwitchStatus, classes }) => (
  <div className="pt-3 authorizedContainer d-flex align-item-start align-items-md-center flex-column flex-md-row justify-content-center">
    <div style={{ flex: 1 }}>
      <TextField
        fullWidth
        label="Buscar por nombre, cédula, placa o casa"
        margin="normal"
        variant="outlined"
        classes={{ marginNormal: classes.marginNormal }}
        onChange={e => {
          handleSearch(e.target.value)
        }}
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline,
            input: classes.input,
          },
        }}
      />
    </div>
    <div style={{ flex: 0.8 }}>
      <div className="d-flex align-items-center pt-3 pt-md-0 justify-content-center">
        <FilterBtn
          txt="Pendientes"
          conditional={status === PENDING}
          onClick={handleSwitchStatus(PENDING)}
          style={{
            btn: classes.searchBtn,
            active: classes.searchBtnActive,
          }}
        />
        <div className="px-2">
          <FilterBtn
            txt="Todos"
            conditional={!status}
            onClick={handleSwitchStatus()}
            style={{
              btn: classes.searchBtn,
              active: classes.searchBtnActive,
            }}
          />
        </div>
        <FilterBtn
          txt="Autorizados"
          conditional={status === AUTHORIZED}
          onClick={handleSwitchStatus(AUTHORIZED)}
          style={{
            btn: classes.searchBtn,
            active: classes.searchBtnActive,
          }}
        />
      </div>
    </div>
  </div>
)

export default Filters
