const express = require('express');
const router = express.Router();
// const {auth, admin} = require("../middleware/auth");


// const userController = require("../controllers/userController");

router.post('/', async (req, res) => {
    res.send("Hey");
});

router.get('/', async (req, res) => {
    res.send("Hey");

});

module.exports = router;
