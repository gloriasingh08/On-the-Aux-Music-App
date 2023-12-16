/*
    Author:     Web of lies
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Provide Playlist API Service methods  
*/
import User from './../models/user.js';

export const getPlaylist = (query) => {
    const param = {...query};
    return User.find(param).exec();
}
