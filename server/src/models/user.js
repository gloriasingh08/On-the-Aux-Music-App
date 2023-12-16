/*
    Author:     Web of lies
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Schema for User
*/

import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

import mongoose from "mongoose";
import { SESS_LIFETIME, SESS_SECRET } from '..//config/config.js';

//Defined users schema
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required.'
    },
    email: {
        type: String,
        required: 'Email is required',
        index: true,
        unique: true
    },
    contactNo: {
        type: String,
        required: 'Phone number is requried.'
    },
    password: {
        type: String,
    },
    playlists: [{
        playlist_name: String,
        playlist_details: [{
            song_name: String,
            song_type: String
        }]
    }],
    createdDate: {
        type: Date,
        default: Date.now
    },
    modifiedDate: {
        type: Date,
        default: Date.now

    },
    resetPassowordToken: String,
    resetPasswordExpired: Date
}, { skipVersioning: true });


//hashing the password before sending to the database, this 'pre' is middleware and will run right 
//before the User instance save

Schema.pre('save', function() {
    if (this.isModified('password')) {
        this.password = hashSync(this.password, 10);
    }
})

Schema.pre('update', function(next) {
    if (this.getUpdate('password')) {
        this.password = hashSync(this.password, 10);
    }
})

//syncing the passowrd here to the actual password entered by the user during logging process
Schema.methods.comparePasswords = function(password) {
    return compareSync(password, this.password);
}

Schema.methods.getSignedToken = function() {
    return jwt.sign({
            userId: userN._id,
            email: userN.email
        },
        SESS_SECRET, {
            expiresIn: SESS_LIFETIME
        }
    )
}
const model = mongoose.model('user', Schema);

export default model;