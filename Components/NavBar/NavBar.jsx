/*
    Author:     Web Of Lies
    Subject:    INFO6150 - Web Design and UX
    Purpose:    JSX file for NavBar Component
*/
import React from "react";
import axios from "axios";
import "./NavBar.scss";
import NavBarOptions from "./NavBarOptions/NavBarOptions";
import {ExploreOutlined, HomeOutlined, PlaylistPlay, SearchOutlined, Radio, EventNote, LibraryAdd} from "@material-ui/icons";
import { decodeToken } from "react-jwt";

class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playlistTags : []
        };
    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        !token ? window.location.href = "/login" : console.log(`Token Present`) 
        const myDecodedToken = decodeToken(localStorage.getItem("token"));
        const userId = myDecodedToken.userId;

        axios.get(`http://127.0.0.1:9008/user/${userId}/playlist`)
        .then((response) => {
            console.log(`Returned Playlists:  ${response.data}`);
            const playlistsFetched = response.data.map((i,k) => 
                     <NavBarOptions className={"lib-sub"} Icon={PlaylistPlay} href={"/home/playlist/"+i}  title={i} key={k} isPlaylistItem = {true} />)
            this.setState({
                playlistTags : [...playlistsFetched]
            });
        });
    }

    render() {
        return (
            <aside style={this.ElementStyle} className={"aside-bar"}>
                <div className="aside-bar-container">
                    <p className={"p1"}>
                        <span>LIBRARY</span>
                    </p>
                    <NavBarOptions className={"lib-sub"} Icon={HomeOutlined} href={"/home"} title={"Home"} />
                    {/* <NavBarOptions className={"lib-sub"} Icon={ExploreOutlined} href={"/home/about"}  title={"About"}/>
                    <NavBarOptions className={"lib-sub"} Icon={SearchOutlined} href={"/home/search"}  title={"Search"}/> */}
                    <NavBarOptions className={"lib-sub"} Icon={Radio} href={"/home/radio"}  title={"Radio"}/>
                    <NavBarOptions className={"lib-sub"} Icon={EventNote} href={"/home/events"}  title={"Events"}/>
                </div>
                <div className="aside-bar-container playlist">
                    <p className={"p1"}>
                        <span>MY PLAYLIST</span>
                    </p>
                    <NavBarOptions className={"lib-sub"} Icon={LibraryAdd} href={"/home/playlist"}  title={"Create a New Playlist"}/>
                    {this.state.playlistTags}
                </div>
            </aside>
        );
    }
}

export default SideBar;