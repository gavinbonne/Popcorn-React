import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, withRouter } from 'react-router-dom';
import { actionCreators as authActionCreators } from "../../../store/Auth";
import TextField from '@material-ui/core/TextField';
import { withStyles, createStyles, Theme, Button, Container, Grid, Typography } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

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

const mapStateToProps = (state: any) => ({
    currentUser: state.auth.currentUser,
    isLoading: state.auth.isLoading,
    isError: state.auth.isError,
    errorMessage: state.auth.errorMessage
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        actions: bindActionCreators(
            { handleSignIn: authActionCreators.handleSignIn },
            dispatch
        )
    };
};

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

    handleSignIn = (event: any) => {
        event.preventDefault();

        this.props.actions.handleSignIn(this.state.email, this.state.password);
        this.setState({
            email: '',
            password: ''
        });
        
        this.props.history.push('/');
    }

    render() {
        const { classes } = this.props;
        return (
            <Container maxWidth="sm">
                <form>
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
                                    onClick={this.handleSignIn}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(Login)));