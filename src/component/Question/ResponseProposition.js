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
        color: props=> props.status === 'success' ? theme.palette.success.main : 
        (props.status === 'error' ? theme.palette.error.main : null),
    },
    iconError: {
        marginRight: theme.spacing(1),
        color: red[600]
    },
    iconSuccess: {
        marginRight: theme.spacing(1),
        color: green[600]
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

    const CustomCheckBox = status === 'success' ? <GreenCheckbox
        checked={checked}
        onChange={handleClick}
    />
        : (status === 'error' ? <RedCheckbox
            checked={checked}
            className={classes.iconError}
        /> : <Checkbox
            checked={checked}
            onChange={handleClick}
            color="primary"
        />)

    return (
        <FormControlLabel
            control={
                CustomCheckBox
            }
            label={<Typography className={classes.label}>{label}</Typography>}
        />
    );
}

export default ResponseProposition;