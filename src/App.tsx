import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import Footer from './components/core/Footer/Footer';
import Header from './components/core/Header/Header';
import Home from './components/pages/Home/Home';
import Movies from './components/pages/Movies/Movies';
import LoadingSpinner from './components/core/LoadingSpinner/LoadingSpinner';
import Login from './components/core/Login/Login';
import User from './components/pages/User/User';

import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { lightGreen, blueGrey } from '@material-ui/core/colors';
import './App.scss';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            light: lightGreen[300],
            main: lightGreen[500],
            dark: lightGreen[700]
        },
        secondary: {
            light: blueGrey[300],
            main: blueGrey[500],
            dark: blueGrey[700]
        }
    },
    overrides: {
        MuiInputLabel: {
            root: {
                color: 'white',
                "&$focused": {
                    color: "white",
                }
            }
        },
        MuiFilledInput: {
            underline: {
                "&:after": {
                    borderBottom: "2px solid white"
                }
            }
        }
    }
});

const mapStateToProps = (state: any) => ({
    isLoading: state.auth.isLoading,
});

class App extends React.Component<any, any> {
    render() {
        const isLoading = this.props.isLoading;
        let content;

        if (isLoading) {
            content = <LoadingSpinner />;
        } else {
            content = <Fragment>
                <Header></Header>
        
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/movies" component={Movies} />
                    <Route exact path="/user" component={User} />
                    <Route component={Home} />
                </Switch>
        
                <div className="grow"></div>
        
                <Footer></Footer>
            </Fragment>;
        }

        return (
            <div className="app-container">
                <BrowserRouter>
                    <CssBaseline>
                        <MuiThemeProvider theme={theme}>
                            {content}
                        </MuiThemeProvider>
                    </CssBaseline>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(mapStateToProps)(App);
