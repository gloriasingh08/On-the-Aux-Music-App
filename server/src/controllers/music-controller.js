/*
    Author:     Web of lies
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Provide Music API controller. Call is made to music service layer from this controller.
*/

import * as  musicService from './../services/music-services.js';
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
export const allMusic = async (request, response) => {
    try{
        const query = {};
        const music = await musicService.getAllMusic(query);
        utils.setSuccessResponse(music, response);
    }catch(error) {
        utils.setErrorResponse(error, response);
    }
}

/**
 * add/save music collection
 * @param {
    "name": "",
    "author_name": "",
    "img": "",
    "lang": "",
    "timesPlayed": 0,
    "type": "",
    "musicName": ""   
 } request 
 * @param {
    "name": "",
    "author_name": "",
    "img": "",
    "lang": "",
    "timesPlayed": 0,
    "type": "",
    "musicName": ""
    
 } response 
 */
export const postallMusic = async (request, response) => {
    try {
        const payload = request.body;
        const music = await musicService.saveAllMusic(payload);
        utils.setSuccessResponse(music, response);
    } catch (error) {
        utils.setErrorResponse(error, response);
    }
}