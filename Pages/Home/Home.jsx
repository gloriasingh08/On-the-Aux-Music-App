/*
    Author:     Web Of Lies
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Javascript file for the Main App React component
*/
import React from 'react';
import './Home.scss';
import Header from '../../Components/Header/Header';
import NavBar from '../../Components/NavBar/NavBar';
import CardContainer from '../../Components/MusicContainer/CardContainer/CardContainer';
import InternetRadio from '../../Components/InternetRadio/InternetRadio';
import MusicPlaying from '../../Components/MusicPlaying/MusicPlaying';
import CreatePlaylist from '../../Components/CreatePlaylist/CreatePlaylist';
import AccountSetting from '../../Components/AccountSetting/AccountSetting';
import EventPage from '../EventsPage/EventsPage';
import PlaylistCardContainer from '../../Components/MusicContainer/PlaylistCardContainer/PlaylistCardContainer';
import { useHistory } from "react-router-dom";


class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Page: <CardContainer />
    };
    this.getCurrPage = this.getCurrPage.bind(this);
  }

  getCurrPage(pathName) {
    switch (pathName) {
      case "/home":
        return <CardContainer />
      case "/home/radio":
        return <InternetRadio />
      case "/home/events":
        return <EventPage />
      case "/home/playlist":
        return <CreatePlaylist/>
      case "/home/playMusic":
        return <MusicPlaying />
      case "/home/accountSetting":
        return <AccountSetting />
      default :
        return <PlaylistCardContainer/>  
    }
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    console.log(` Conditional flow: ${token}`);
    !token ? window.location.href = "/login" : console.log(`Token Present`) 
    const path = window.location.pathname;
    console.log(path);
    const Component = this.getCurrPage(path);
    this.setState({
      Page: Component
    })
  }

  render() {
    return (
      <div className={"home-container"}>
        <Header></Header>
        <section className={"home-music-container"}>
          <div className="sidebar-home">
            <NavBar/>
          </div>
          <div className="main-home">
            {/* <CardContainer /> */}
            {/* <InternetRadio /> */}
            {/* <MusicPlaying />  */}
            {/* <CreatePlaylist /> */}
            {/* <EventPage/> */}
            {this.state.Page}
          </div>
        </section>
      </div>
    );
  }
}

export default Home;