/*
    Author:     Web of lies
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Javascript file for the Main App React component
*/
import React from 'react';
import './App.scss';
import Homepage from './Pages/HomePage/HomePage';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup'
import Home from './Pages/Home/Home';
import Event from './Pages/EventsPage/EventsPage.jsx';
import Logout from './Pages/LogoutPage/Logout.jsx'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeContext, themes } from './Utils/js/theme.js';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let currentTheme = sessionStorage.getItem('theme')
        if (!currentTheme) {
            sessionStorage.setItem('theme', 'light')
        }
    }
//using token here to assign that to the user

    setLoginUser = (token)=>{
        localStorage.setItem("token",token)
        
        
    }

    render() {
        return ( 
            <ThemeContext.Provider value = { themes.light } >
                <Router>
                    <Switch>
                        <Route exact path = "/" > < Homepage/> </Route> 
                        <Route path = "/login"> < Login setLoginUser = {this.setLoginUser}/> </Route> 
                        <Route path = "/signup" > < Signup/> </Route> 
                        <Route path = "/home" > < Home/> </Route>
                    </Switch> 
                </Router> 
            </ThemeContext.Provider>
        );
    }
}

export default App;