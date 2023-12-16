/*
    Author:     Web of Lies
    Subject:    INFO6150 - Web Design and UX
    Purpose:    JSX file for Toggle the theme
*/

import React, { useState, useEffect } from "react";
import { lightTheme, darkTheme } from "./theme";
import Switch from '@material-ui/core/Switch';

export default function Toggle() {
    //Current theme is picke up by session storage
    let sessionTheme = sessionStorage.getItem('theme')
    const [currentTheme, setTheme] = useState(sessionTheme)
        // const [currentTheme, setTheme] = useState("light");

    // Current theme is saved by useeffect
    useEffect(() => {
        const theme = currentTheme === "light" ? lightTheme : darkTheme;
        console.log("main", theme)
        sessionStorage.setItem('theme', currentTheme)
        Object.keys(theme).forEach((key) => {
            const value = theme[key];
            document.documentElement.style.setProperty(key, value);
        });
    }, [currentTheme]);

    //Ontoggle current theme is changed light to dark and vice-versa
    function onToggleTheme() {
        setTheme(currentTheme === "light" ? "dark" : "light");
        //  sessionStorage.setItem('theme',currentTheme)
        console.log(currentTheme);
    }

    return <div >

        <
        Switch
        //   checked={()=>this.state.checkedA}
    onChange = { onToggleTheme }
    name = "checkedA"
    checked = { currentTheme == 'dark' }
    inputProps = {
        { 'aria-label': 'secondary checkbox' }
    }
    /> < /
    div >


}