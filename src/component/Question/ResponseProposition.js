import { useState } from 'react';
import {
    FormControlLabel,
    Checkbox
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    container: {
    },
}));

const ResponseProposition = ({ label }) => {
    const [checked, setChecked] = useState(false);
    const classes = useStyles();

    const handleClick = () => {
        setChecked(!checked)
    }

    return (
        <FormControlLabel
            control={
                <Checkbox checked={checked} onChange={handleClick} value="gilad" />
            }
            label={label}
        />
    );
}

export default ResponseProposition;