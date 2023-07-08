import express from 'express';
import db from '../../models/index.js';

async function userList (req, res) {
    const users = await db.User.findAll();
    res.status(200).send(users);
}

export default {
    userList
}