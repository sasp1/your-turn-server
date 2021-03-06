const express = require('express');
const router = express.Router();
const {User, validate} = require("../models/user");


router.post('/', async (req, res) => {
    const {error} = validate(req.body);

    if (error) return res.status(400).send(error)

    const user = new User({name: req.body.name});
    await user.save();

    res.send(user);
});

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

module.exports = router;
