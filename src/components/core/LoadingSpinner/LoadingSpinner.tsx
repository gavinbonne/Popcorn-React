import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './LoadingSpinner.scss';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        progress: {
            margin: theme.spacing(2),
        }
    })
);

const LoadingSpinner = () => {
    const classes = useStyles();

    return (
        <div className="center">
            <CircularProgress
                className={classes.progress}
                size={200} />
        </div>
    );
}

export default LoadingSpinner;
