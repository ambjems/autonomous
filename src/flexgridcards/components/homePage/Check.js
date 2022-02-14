import React from 'react'
import { Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
export default function Check(props) {

    const BlueCheckbox = withStyles({
        root: {
          color: '#78838C',
          '&$checked': {
            color: '#14AFF1',
          },
        },
        checked: {},
      })((props) => <Checkbox color="default" {...props} />);
    return (
        <div>
           <BlueCheckbox
            id={props.id}
            checked={props.value=== props.id}
            onChange={props.handleCheck}
            />
        </div>
    )
}
