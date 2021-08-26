const express = require('express');
const router = express.Router();
const {TimeSlot, validate} = require("../models/timeSlot");


router.post('/', async (req, res) => {
    const {error} = validate(req.body);

    if (error) return res.status(400).send(error)

    const timeSlot = new TimeSlot(req.body);
    await timeSlot.save();

    res.send(timeSlot);
});

router.get('/', async (req, res) => {

    const timeSlots = await TimeSlot.find();
    console.log("timeslots", timeSlots);

    res.send(timeSlots);
});

module.exports = router;
