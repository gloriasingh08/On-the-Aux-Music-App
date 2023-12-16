/*
    Author:     Web of lies
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Javascript file for the Main App React component
*/

export const{
SESS_NAME = 'sid',
SESS_SECRET = 'secret!session',
SESS_LIFETIME = 1000 * 60 * 60 * 2
} = process.env;

//these are the environment variables required for the session management and token generation
