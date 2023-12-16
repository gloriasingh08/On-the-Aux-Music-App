/*
    Author:     Web of Lies
    Subject:    INFO6150 - Web Design and UX
    Purpose:    JSX file for Internet Radio
*/
import React from 'react'
import { Box } from '@material-ui/core';
import { Slider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './InternetRadio.scss'
import { RadioBrowserApi } from "radio-browser-api"
import Toggle from '../../Utils/js/toggle';
import { lightTheme, darkTheme } from "../../Utils/js/theme";
class InternetRadio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: false,
            show: false,
            stations: [101.8, 98.3],
            currantStation: {},
            stationData: {},
            frequencys: [
                //Set the freqeuncy value of radio
                {
                    value: 70.0,
                    label: "70.0hz"
                },
                {
                    value: 80.0,
                    label: "80.0hz"
                },
                {
                    value: 90.0,
                    label: "90.0hz"
                },
                {
                    value: 100.0,
                    label: "100.0hz"
                },
                {
                    value: 110.0,
                    label: "110.0hz"
                },
            ]

        }

    }
    // Radio Api called for setting up the country   
    componentDidMount() {
        this.setupApi("country")
        let currentTheme = sessionStorage.getItem('theme')
        const theme = currentTheme === "light" ? lightTheme : darkTheme;
        console.log("main", theme)
        // sessionStorage.setItem('theme', currentTheme)
        Object.keys(theme).forEach((key) => {
            const value = theme[key];
            document.documentElement.style.setProperty(key, value);
        });


        // return stations
    }
    //Radio Api setting fucntion made to see in the browser    
    setupApi = async stationFilter => {
        const api = new RadioBrowserApi(fetch.bind(window), "My Radio App")
        let obj = {}
        let start = 70
        const stations = await api
            .searchStations({
                language: "english",
                tag: stationFilter,
                limit: 5,
            })
            .then(data => {
                data.map((res, i) => {
                    obj[String(this.state.frequencys[i].value)] = res
                })
                this.setState({ stationData: obj })
                console.log(this.state.stationData)
            })
    }
    //Disc has to be start as running while playing the music
    startSong = () => {
        this.setState({ start: true })
    }
    //Disc has to be pause as running while playing the music    
    pauseSong = () => {
        this.setState({ start: false })
    }
    // Rdio station port has to be visible as value(ex:- 70.0,80.0 etc)
    valuetext = (value) => {
        return `${value}hz`;
    }
    //Changestation  fucntion is made for changing the radio port and set the value is true for defined port 

    changeStation = (event, value) => {
        this.setState({ show: false, start: false })
        console.log(value)
        console.log(this.state.stationData)
        if (this.state.stationData[value]) {

            this.setState({ show: true })
            this.setState({ currantStation: this.state.stationData[value] })
        } else {
            this.setState({ currantStation: {} })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className='radioMain'>
                    <div className='row'>
                        <div className='internetRadio col-md-10 offset-md-2s' >
                            <div className="box"><div className={this.state.start ? "diskStart" : 'diskStop'}></div></div>
                            <div>
                                {(this.state.currantStation.favicon) ? <img className='songImgRadio' src={this.state.currantStation.favicon} /> : null}
                            </div>
                        </div>
                        <div className='radioBox'>
                            <Box sx={{ width: 600 }}>
                                <Slider
                                    aria-label="Always visible"
                                    defaultValue={98.3}
                                    getAriaValueText={this.valuetext}
                                    step={0.1}
                                    marks={this.state.frequencys}
                                    valueLabelDisplay="on"
                                    onChange={this.changeStation}
                                    max={110}
                                    min={70}

                                />
                            </Box>
                            <div className='audioDiv' >
                                {(this.state.show) ? <audio
                                    className='audio'
                                    controls
                                    onPlay={this.startSong}
                                    onPause={this.pauseSong}
                                    src={this.state.currantStation.urlResolved}>
                                    <code>audio</code> element.

                                </audio> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}



export default InternetRadio