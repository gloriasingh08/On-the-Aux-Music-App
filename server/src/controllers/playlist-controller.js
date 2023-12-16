/*
    Author:     Web of lies
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Provide Playlist API controller. Call is made to playlist service layer from this controller.
*/

import * as  playlistService from './../services/playlist-services.js';
import * as utils from './../helpers/utils.js';


/**
 * get all music collection
 * @param {*} request 
 * @param {[{
    "name": "",
    "author_name": "",
    "img": "",
    "lang": "",
    "timesPlayed": 0,
    "type": "",
    "musicName": ""
 }]} response 
 */
export const paylist = async (request, response) => {
    try{
        const query = {};
        const myPlaylist = await playlistService.getPlaylist(query);
        utils.setSuccessResponse(myPlaylist, response);
    }catch(error) {
        utils.setErrorResponse(error, response);
    }
}

