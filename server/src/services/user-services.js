import User from './../models/user.js';
import {extractPlaylistNameFromUser} from '../helpers/utils.js'


export const save = (newContact) => {
    const user = new User(newContact);
    return user.save();
}

export const search = (query) => {
    const params = {...query };
    return User.find(params).exec();
}

export const get = (id) => {
    return User.findById(id).exec();
}

export const update = (updatedUser) => {
    updatedUser.modifiedDate = new Date();
    console.log("**", updatedUser.id, updatedUser)
    return User.findByIdAndUpdate(updatedUser.id, updatedUser).exec();
}

export const remove = (id) => {
    User.findByIdAndDelete(id).exec();
}

export const checkPassword = (email) => {
    return User.findOne({email : email}).exec();    
}

export const getPlaylistsForAUser = async (id) => {
    const user = await User.findById(id).exec();
    const playlists = extractPlaylistNameFromUser(user);
    return playlists;
}

export const appendPlaylistForAUser = async (id, playlist) => {
    console.log(`Received a New Playlist for User: ${id}. Playlist Details ${playlist.playlist_name}`);
    try {
        const result =  await User.updateOne(
            { _id : id},
            {$push: {playlists : playlist}}
        );
        console.log(result);
        return result
    } catch(e)
    {
        console.log(e);
    }    
}

export const deletePlaylistForAUser = async (id, playlistToDelete) => {
    console.log(`Deleting Playlist for User: ${id}. Playlist Name ${playlistToDelete}`);
    try {
        const result =  await User.updateOne(
            { _id : id},
            {$pull: {
                // playlists : [{playlist_name : playlistToDelete}]
                playlists : {playlist_name : { $in : playlistToDelete}}
                }
            }
        );
        console.log(result);
        return result
    } catch(e)
    {
        console.log(e);
    }    
}

