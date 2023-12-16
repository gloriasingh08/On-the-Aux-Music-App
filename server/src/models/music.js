/*
    Author:     Web of lies
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Schema for Music collection 
*/
import mongoose from "mongoose";

//Defined Music Schema
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Music short name is required.',
        unique: true
    },
    author_name: {
        type: String,
        required: 'author_name is required'
    },
    img: {
        type: String,
        required: 'Music image is requried.'
    },
    lang: {
        type: String,
    },
    timesPlayed: {
        type: Number
    },
    type: {
        type: String,
        required: 'Music type number is requried.'
    },
    musicName: {
        type: String,
        required: 'Music detail name number is requried.',
        unique: true
    }
}, { skipVersioning: true });

/**
 * Validates unique name
 */
Schema.path('name').validate(async(name) => {
    const nameCount = await mongoose.models.music.countDocuments({ name })
    return !nameCount
}, 'Name already exists')

/**
 * Validates unique musicName
 */
Schema.path('musicName').validate(async(musicName) => {
    const musicNameCount = await mongoose.models.music.countDocuments({ musicName })
    return !musicNameCount
}, 'Music Name already exists')


const model = mongoose.model('music', Schema);

export default model;