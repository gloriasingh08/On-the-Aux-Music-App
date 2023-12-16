/*
    Author:     Web of lies
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Provide route for all available API 
*/
import express from "express";
import * as userController from './../controllers/user-controller.js';
import * as musicController from './../controllers/music-controller.js';

const router = express.Router();
//Create and fecth data for users
router.route('/user')
    .post(userController.post)
    .get(userController.index);
//Create data for login
router.route('/login')
    .post(userController.login)
    //Update,fecth and delete data, search by id
router.route('/user/:id')
    .get(userController.get)
    .put(userController.update)
    .delete(userController.remove);
//Fecth and update data, search by id and playlists
router.route('/user/:id/playlist')
    .get(userController.getPlaylists)
    .put(userController.updatePlaylists)
    //Delete data, search by id and playlists
router.route('/user/:id/playlist/:playlist')
    .delete(userController.deletePlaylist)
    //Create and fecth data for music
router.route('/music')
    .post(musicController.postallMusic)
    .get(musicController.allMusic);

export default router;