import { useState } from 'react';
import {
    FormControlLabel,
    Checkbox,
    Typography,
} from '@material-ui/core';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: props=> props.status === 'success' ? theme.palette.success.light : 
        (props.status === 'error' ? theme.palette.error.light : null),
        width: '100%'
    },
    label: {
        color: props=> props.status === 'success' ? theme.palette.success.contrastText : 
        (props.status === 'error' ? theme.palette.error.contrastText : null),
    }
}));

const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const RedCheckbox = withStyles({
    root: {
      color: red[400],
      '&$checked': {
        color: red[600],
      },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


const ResponseProposition = ({ label, status, index, checked, handleCheckProposition }) => {
    const classes = useStyles({status});
    const handleClick = () => {
        handleCheckProposition({
            checked:!checked,
            index
        })
    }

    const CustomCheckBox = status === 'success' ? GreenCheckbox
    : (status === 'error' ? RedCheckbox : Checkbox)

    return (
        <FormControlLabel
            className={classes.container}
            control={
                <CustomCheckBox 
                    checked={checked}
                    onChange={handleClick}
                />
            }
            label={<Typography className={classes.label}>{label}</Typography>}
        />
    );
}

export default ResponseProposition;