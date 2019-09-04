import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators as authActionCreators } from "../../../store/Auth";

import { Link as MatLink } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { fade, Theme, createStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/styles';
import './Header.scss';

const styles = (theme: Theme) => createStyles({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    searchWrapper: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 400,
        },
    },
});

const mapStateToProps = (state: any) => ({
    currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        actions: bindActionCreators(
            { handleSignOut: authActionCreators.handleSignOut },
            dispatch
        )
    };
};

class Header extends React.Component<any, any> {

    handleSignOut = () => {
        this.props.actions.handleSignOut();
    }

    render() {
        const { classes } = this.props;

        let authButton;
        if (!this.props.currentUser) {
            authButton = <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/login">
                Log in
            </Button>;
        } else {
            authButton = <div>
                <Button
                    color="inherit"
                    component={Link}
                    to="/user">
                    {this.props.currentUser.fullName}
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleSignOut}
                    component={Link}
                    to="/login">
                    Log Out
                </Button>
            </div>
        }

        return (
            <AppBar position="static" >
                <Toolbar>
                    <MatLink
                        component={Link}
                        to="/"
                        color="inherit">
                        <Typography
                            variant="h5"
                            className="page-name">Popcorn</Typography>
                    </MatLink>

                    <div className={classes.searchWrapper}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>

                            <InputBase
                                placeholder="Search by Movie or Actor"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }} />
                        </div>
                    </div>

                    {authButton}
                </Toolbar>
            </AppBar>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));
