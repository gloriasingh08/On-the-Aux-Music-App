/*
    Author:     Web of lies
    Subject:    INFO6150 - Web Design and UX
    Purpose:    helper component
*/
import { json } from "express";

export const setErrorResponse = (error, response) => {
    response.status(500);
    response.status(409);
    response.json(error);
}

export const setSuccessResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
}

export const extractPlaylistNameFromUser = (obj) => {
    const userPlaylists =  obj.playlists; 
    const playlistNames = []
    userPlaylists.forEach(item => {
        playlistNames.push(item.playlist_name);
    });
    console.log(`Returning : ${playlistNames}`);
    return playlistNames;
}

export const sessionizeUser=user =>{
    return {userId:user._id, username:user.name};

}