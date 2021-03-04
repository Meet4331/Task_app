const express = require('express');
const Client = require('../models/task');
const router = new express.Router();

router.post('/task', (req, res) => {
    const task = new Client(req.body);
    task.save().then(() => {
        res.send(task);
    }).catch((err) => {
        res.send(err);
    })
})

module.exports = router;
