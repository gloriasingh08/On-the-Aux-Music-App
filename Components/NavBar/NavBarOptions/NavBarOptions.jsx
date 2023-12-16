/*
    Author:     Web Of Lies
    Subject:    INFO6150 - Web Design and UX
    Purpose:    JSX file for NavBar Item Component
*/
import React from "react";
import './NavBarOptions.scss'
import {Link} from "react-router-dom";
import {Button, IconButton} from '@material-ui/core';
import {Delete} from "@material-ui/icons";
import axios from "axios";
import CardContainer from '../../MusicContainer/CardContainer/CardContainer';
import { decodeToken } from "react-jwt";

class SideBarOptions extends React.Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {  
            title : this.props.title
        };
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        const token = localStorage.getItem("token");
        !token ? window.location.href = "/login" : console.log(`Token Present`) 
        const myDecodedToken = decodeToken(localStorage.getItem("token"));
        const userId = myDecodedToken.userId;
        console.log(`Deleting Playlist : ${this.state.title}`);
        axios.delete(`http://127.0.0.1:9008/user/${userId}/playlist/${this.state.title}`)
            .then((response) => {
                response.modified_count ? console.log(`Playlist Deleted`) : console.log(`Playlist Not Deleted`)
                window.location.reload();
            });
    }

    navigateToPlaylist() {
        return <CardContainer/>
    }

    render() {
        const Icon = this.props.Icon;
        const title = this.props.title;
        const className = this.props.className;
        const isPlaylistItem = this.props.isPlaylistItem;
        const href = this.props.href;
        const playlistClass = isPlaylistItem? "playlistItem" : "";
        return (
            <div className={playlistClass}>
                <Button onClick={()=>{this.myRef.current.click();window.location.reload();}} className={className} startIcon={Icon && <Icon/>}>
                    <Link ref={this.myRef} to={href}/>
                    {title}
                </Button>
                {
                    isPlaylistItem ? 
                        <IconButton color="secondary" onClick={this.handleDelete}>
                            <Delete></Delete>
                        </IconButton>
                    :
                    <></>
                }    
            </div>
        );
    }
}

export default SideBarOptions;