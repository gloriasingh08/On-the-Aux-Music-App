import React from "react";


// Toggle the color theme for light version
export const themes = {
    light: {
        theme: "#07689f",
        subTheme: "#a2d5f2",
        bgImage: "linear-gradient(#E56B6F, #6D597A)",
        component: {
            backgroundColor: "#f6f6f6",
            color: "#2b2024",
        },
        button: {
            onHover: {
                backgroundColor: "#a2d5f2",
                color: "#191919"
            },
            contained: {
                backgroundColor: "#07689f",
                color: "#fafafa"
            },
            outlined: {
                backgroundColor: "transparent",
                color: "#191919"
            }
        },
        volume: {
            color: "#07689f"
        }
    },
    // Toggle the color theme for dark version    
    dark: {
        theme: "#4ecca3",
        subTheme: "#a2d5f2",
        bgImage: "linear-gradient(#533637, #612b85)",
        component: {
            backgroundColor: "#232931",
            color: "#eeeeee",
        },
        button: {
            onHover: {
                backgroundColor: "#a2d5f2",
                color: "#fafafa"
            },
            contained: {
                backgroundColor: "#07689f",
                color: "black"
            },
            outlined: {
                backgroundColor: "transparent",
                color: "#fafafa"
            }
        },
        volume: {
            color: "#07689f"
        }
    }
};

export const ThemeContext = React.createContext(
    themes.light
);

export const lightTheme = {
    "--color-text": "black",
    "--bgImage": "linear-gradient(#E56B6F, #6D597A)",
    "--color-bg": "#f0f0f0",
    "--color-primary": "#EF5350",
    "--color-secondary": "#0c969b",
    "--color-app-bg": "rgba(255, 255, 255, 0.9)",
    "--color-slider-cover": " #3f51b5",
    "--color-slider-lable": "rgba(0, 0, 0, 0.87)",
    "--bg-image": "url('../static/media/bgLight.46cbeaa846f504228415.jpg')"
};
export const darkTheme = {
    "--color-text": "white",
    "--color-bg": "#011627",
    "--bgImage": "linear-gradient(#533637, #612b85)",
    "--color-primary": "#c792ea",
    "--color-secondary": "#7fdbca",
    "--color-app-bg": "rgba(1, 10, 18, 0.9)",
    "--color-slider-cover": "darkgoldenrod",
    "--color-slider-lable": "darkgoldenrod",
    "--bg-image": "url('../bgDark.jpg')"
};