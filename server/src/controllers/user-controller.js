/*
    Author:     Web of lies
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Provide User API controller. Call is made to user service layer from this controller
*/

import * as userService from './../services/user-services.js';
import * as utils from './../helpers/utils.js';
import bcrypt, { hash, hashSync } from 'bcrypt';
import Model from '..//models/user.js'
import express from 'express';
import { SESS_LIFETIME, SESS_SECRET } from '..//config/config.js';
import jwt from 'jsonwebtoken';

//user is being created here and post function starts here
export const post = async(request, response) => {
    try {
        const payload = request.body;
        const user = await userService.save(payload);
        utils.setSuccessResponse({ message: `User successfully added` }, response);
    } catch (error) {
        utils.setErrorResponse(error, response);
    }
}

//post function ends here


//function to get one user with that firstname and lastname
export const index = async(request, response) => {
    try {
        console.log(request.query);
        const firstName = request.query.firstName;
        const lastName = request.query.lastName;
        const query = {};
        if (firstName) {
            query.firstName = firstName;
        }
        if (lastName) {
            query.lastName = lastName;
        }
        const users = await userService.search(query);
        utils.setSuccessResponse(users, response);

    } catch (error) {
        utils.setErrorResponse(error, response);
    }
}


export const get = async(request, response) => {
    try {
        const id = request.params.id;
        const user = await userService.get(id);
        utils.setSuccessResponse(user, response);
    } catch (error) {
        utils.setErrorResponse(error, response);
    }
}

//updating user information
export const update = async(request, response) => {
    try {
        const id = request.params.id;
        const updated = {...request.body };
        updated.id = id;
        const user = await userService.update(updated);
        console.log('check', user)
        utils.setSuccessResponse(user, response);
    } catch (error) {
        utils.setErrorResponse(error, response);
    }
}

//update function starts here

export const remove = async(request, response) => {
    try {
        const id = request.params.id;
        await userService.remove(id);
        utils.setSuccessResponse({ message: `Successfully removed ${id}` }, response);
    } catch (error) {
        utils.setErrorResponse(error, response);
    }
}

//login credentials with token generation
export const login = async(request, response) => {
    try {

        const { email, password } = request.body;
        const user = await userService.checkPassword(email);
        const userN = await Model.findOne({ email });
        if (user) // if the user is already present
        {
            //here the user-password is being compared to the hashed password in the database
            if (userN && userN.comparePasswords(password)) {
                const token = jwt.sign({
                    email: userN.email,
                    userId: userN._id
                }, SESS_SECRET, {
                    expiresIn: SESS_LIFETIME
                });

                utils.setSuccessResponse({ message: `Successfully Logged In`, token: token }, response);
            } else {
               
                const user = await userService.checkPassword(email);
                if (user.password === password) {

                    const token = jwt.sign({
                        email: userN.email,
                        userId: userN._id
                    }, SESS_SECRET, {
                        expiresIn: SESS_LIFETIME
                    });

                    utils.setSuccessResponse({ message: `Successfully Logged In`, token: token }, response);
                } else

                    utils.setSuccessResponse({ message: `Oops!! Password Did not match,Invalid credentials` }, response);
            }
        } else //if the user does not exist
        {
            utils.setSuccessResponse({ message: `User does not exist` }, response);
        }
    } catch (error) {
        utils.setErrorResponse(error, response);
    }
}
//login part ends here


//get playlist function for a user starts here
export const getPlaylists = async(request, response) => {
    try {
        const id = request.params.id;
        console.log(`Getting playlists for: ${id}`);
        const user = await userService.getPlaylistsForAUser(id);
        utils.setSuccessResponse(user, response);

    } catch (error) {
        utils.setErrorResponse(error, response);
    }
}

//getplaylist function ends here


//update a playlist function starts here which is a filtering functionality
export const updatePlaylists = async(request, response) => {
    try {
        const id = request.params.id;
        const playlist_name = request.body.playlist_name;
        const playlist_details = request.body.playlist_details.map((value) => {
            return {
                'song_name': value
            }
        });

        const playlist = {
            'playlist_name': playlist_name,
            'playlist_details': playlist_details
        }
        const result = await userService.appendPlaylistForAUser(id, playlist);
        utils.setSuccessResponse(result, response);
    } catch (error) {
        utils.setErrorResponse(error, response);
    }
}



export const deletePlaylist = async(request, response) => {
    try {
        const id = request.params.id;
        const playlist_name = request.params.playlist;
        // console.log(`Delete PLaylist: ${playlist_name} for User: ${id}`);

        const result = await userService.deletePlaylistForAUser(id, playlist_name);
        utils.setSuccessResponse(result, response);

    } catch (error) {
        utils.setErrorResponse(error, response);
    }
}