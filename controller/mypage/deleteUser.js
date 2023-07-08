import express from 'express';
import db from '../../models/index.js';
import bcrypt from 'bcrypt';

async function deleteUser (req, res) {
    const id = req.params.id;
    const password = req.body.password;

    if (password) {
        const users = await db.User.findAll({
            where: {id: id}
        });

        const check = await bcrypt.compare(password, users[0].password);
        if (!check) {
            res.status(400).send("INVALID_PASSWORD");
        } else {
            users[0].update({ useStatus: 0 });
            res.status(200).send("USER_DELETED");
        }
    } else {
        res.status(400).send("PASSWORD_NOT_ENTERED");
    }
}

export default {
    deleteUser
}