import express from 'express';
import db from '../../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const saltRounds = 10;

async function resetPassword (req, res) {
    const id = req.params.id;
    const password = req.body.password;
    const passwordVerify = req.body.passwordVerify;

    if (password && passwordVerify) {
        if (password !== passwordVerify) {
            res.status(400).send("BAD_REQUEST");
        } else {
            const encryptedPW = bcrypt.hashSync(password, saltRounds);
            const users = await db.User.findAll({
                where: {id: id}
            });

            const check = await bcrypt.compare(password, users[0].password);
            if (!check) {
                users[0].update({ password: encryptedPW });
                res.status(200).send("SUCCESS");
            } else {
                res.status(400).send("CURRENT_PASSWORD");
            }
        }
    } else {
        res.status(400).send("BAD_REQUEST");
    }
}

export default {
    resetPassword
}