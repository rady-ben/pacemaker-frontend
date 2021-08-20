import { useState } from 'react';
import {
    FormControlLabel,
    Checkbox,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


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

const ResponseProposition = ({ label, status }) => {
    const [checked, setChecked] = useState(false);
    const classes = useStyles({status});

    const handleClick = () => {
        setChecked(!checked)
    }

    return (
        <FormControlLabel
            className={classes.container}
            control={
                <Checkbox checked={checked} onChange={handleClick} value="gilad" />
            }
            label={<Typography className={classes.label}>{label}</Typography>}

        />
    );
}

export default ResponseProposition;