import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Footer from './components/core/Footer/Footer';
import Header from './components/core/Header/Header';
import Home from './components/pages/Home/Home';
import Movies from './components/pages/Movies/Movies';
import Login from './components/core/Login/Login';

import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import './App.scss';

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: "#333333"
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

class App extends React.Component {
    render() {
        return (
            <div className="app-container">
                <BrowserRouter>
                    <CssBaseline>
                        <MuiThemeProvider theme={theme}>
                            <Header></Header>

                            <Switch>
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/movies" component={Movies} />
                                <Route component={Home} />
                            </Switch>

                            <div className="grow"></div>

                            <Footer></Footer>
                        </MuiThemeProvider>
                    </CssBaseline>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
