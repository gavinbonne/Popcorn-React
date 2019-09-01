import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles, createStyles, Theme, Button, Container, Grid, Typography } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) => createStyles({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        }
    },
    textFieldInput: {
        color: 'inherit'
    },
    link: {
        color: 'white',
        '&:visited': {
            color: 'white',
        }
    }
});

class Login extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleInputChange = (event: any) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event: any) => {
        alert('Email: ' + this.state.email + ' Password: ' + this.state.password);
        event.preventDefault();
    }

    render() {
        const { classes } = this.props;
        return (
            <Container maxWidth="sm">
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                id="email-input"
                                label="Email"
                                className={classes.textField}
                                color="inherit"
                                type="email"
                                name="email"
                                margin="normal"
                                variant="filled"
                                InputProps={{
                                    className: classes.textFieldInput,
                                }}
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                fullWidth />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                id="password-input"
                                label="Password"
                                className={classes.textField}
                                type="password"
                                name="password"
                                margin="normal"
                                variant="filled"
                                InputProps={{
                                    className: classes.textFieldInput,
                                }}
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                fullWidth />

                            <Link
                                to="/forgot-password"
                                className={classes.link}>
                                <Typography
                                    variant="subtitle1">Forgot Password</Typography>
                            </Link>
                        </Grid>

                        <Grid item xs={12} container justify="center">
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleSubmit}
                                    fullWidth>Log in</Button>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} container justify="center">
                            <Grid item xs={6}>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    fullWidth>Sign up</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );
    }
}

export default withStyles(styles)(Login);