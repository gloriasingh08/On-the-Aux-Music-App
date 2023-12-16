/*
    Author:     Web of lies
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Javascript file to keep count and status of common variables used in application
*/
import musicDB from "../../Utils/js/music.js";

export const initialState = {
    playlists: musicDB,
    // playlists: [async () => {
    //     let axios = require('axios');
    //     let res = await axios.get('http://localhost:9008/music');
    //     let allmusicdb =  JSON(res);
    //     console.log(allmusicdb);
    //     return allmusicdb;}],
    playing:null,
    bannerOpen: false,
    search:null,
    language: null,
    userid : ""
};
const musicReducer = (state=initialState,action) => {
    switch (action.type){
        case "SET_PLAYLIST":
            return {
                ...state,
                playlists: action.payload
            }
        case "SET_CURR_PLAYING":
            return {
                ...state,
                playing: action.payload
            }
        case "SET_BANNER_OPEN":
            return {
                ...state,
                bannerOpen: action.payload
            };
        // case "INC_TIMES_PLAYED":
        //     musicDB[action.payload].timesPlayed += 1;
        //     return state;
        case "SET_SEARCH_QUERY":
            return {
                ...state,
                search: action.payload
            };
        case "SET_MUSIC_LIST":
            return {
                ...state,
                language: action.payload
            };
        case "SET_USERID":
            return {
                ...state,
                userid: action.payload
            };
        default:
            return state;
    }
};

export default musicReducer;