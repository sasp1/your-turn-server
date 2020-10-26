const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const timeSlotSchema = new mongoose.Schema({
    timeStart: {
        type: Number,
        required: true,
        min: 0,
        max: 86340
    }, timeEnd: {
        type: Number,
        required: true,
        min: 0,
        max: 86340
    }, user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);

function validate(timeSlot) {
    const schema = Joi.object({
        timeStart: Joi.number().integer().min(0).max(86340).required(),
        timeEnd: Joi.number().integer().min(0).max(86340).required(),
        userId: Joi.objectId().required(),
    });

    return schema.validate(timeSlot);
}

module.exports.TimeSlot = TimeSlot;
module.exports.validate = validate;
