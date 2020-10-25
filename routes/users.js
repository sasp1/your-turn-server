const express = require('express');
const router = express.Router();
const {User, validate} = require("../models/user");


router.post('/', async (req, res) => {
    const {error} = validate(req.body);

    if (error) return res.status(400).send(error)

    res.send({_id: "hej"});
});

router.get('/', async (req, res) => {
    res.send("Hey");

});

module.exports = router;
