/*
    Author:     Web of lies
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Javascript file to display music from selected playlist in Grid format WRT URL
*/

import React, {useState} from "react"
import './PlaylistCardContainer.scss';
import Card from '../Card/Card';
import { useSelector } from "react-redux";
import Container from "../Containers/Container";
import { decodeToken } from "react-jwt";

function PlaylistCardContainer() {
    const playlistNameArr = window.location.pathname.split('/');
    const playListTodisplay = playlistNameArr[3].replaceAll('%20',' ');
    //console.log("pathlocation:"+playListTodisplay);

    let axios = require('axios');
    const [playlists, setPlaylists] = useState([
        {
            "_id": "",
            "name": "",
            "author_name": "",
            "img": "",
            "lang": "",
            "timesPlayed": 0,
            "type": "",
            "musicName": "",
            "__v": 0
        }
    ]);
    
    const getPlaylistsOfAUser = () => {
        const token = localStorage.getItem("token");
        !token ? window.location.href = "/login" : console.log(`Token Present`) 
        const myDecodedToken = decodeToken(localStorage.getItem("token"));
        const userId = myDecodedToken.userId;
        axios
            .get(`http://localhost:9008/user/${userId}`,{
                responseType: 'json'
              })
            .then(function (response) {
                //console.log("response:" +response.data.playlists);
                response.data.playlists.map(p => {
                    
                    if(p.playlist_name === playListTodisplay){
                        //get all song names in a array 
                        const songNames = [];
                            p.playlist_details.map(n => (
                                songNames.push(n.song_name)
                            ));
                        
                        // get music collection
                        axios
                        .get("http://localhost:9008/music",{
                            responseType: 'json'
                          })
                        .then(function (res) {
                            const tempPlaylist = [];
                            res.data.map(i => (
                                songNames.map(s => {
                                    //only display songs from selected playlist
                                    if(s === i.name)
                                    tempPlaylist.push(i);
                                    console.log("tempPlaylist: "+tempPlaylist);
                                    // const finalPlaylist = [tempPlaylist];
                                }
                            )
                            ));
                            
                            setPlaylists(tempPlaylist);
                        });

                    }
                    
                })
            });
    };


    return (
        <Container>
            <div className={"music-card-container"}  onLoad={getPlaylistsOfAUser}>
                {
                    playlists.map(item => (
                        <Card key={item.id} music={item} />
                    ))
                }
            </div>
        </Container>
    );
}

export default PlaylistCardContainer;
