const {User} = require('../../models/user');
const {TimeSlot} = require('../../models/timeSlot');
const request = require('supertest');
const app = require('../..');
let server;
const config = require('config');
const mongoose = require('mongoose');
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;
chai.should();

describe('/api/timeslots', () => {
    let user;

    before(async () => {
        server = app.listen(config.get('port'));
        await mongoose.connect(config.get('db'), {useNewUrlParser: true, useUnifiedTopology: true});

    });
    after(async () => {
        // await dropAllCollections();
        await server.close();
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        user = new User({name: "user1"});
        await user.save();
    });
    afterEach(async () => {
        await User.deleteMany();
        await TimeSlot.deleteMany();
        // await removeAllCollections();
    });

    describe('POST /', () => {
        let timeSlot;

        beforeEach(() => {
            timeSlot = {
                timeStart: 50400,
                timeEnd: 54000,
                userId: user.id
            }

        });

        const exec = () => {
            return request(server)
                .post("/api/timeslots")
                .send(timeSlot);
        };

        it("Should return 400 if start time and end time not provided", async () => {
            timeSlot = {userId: user.id};

            const res = await exec();

            expect(res.statusCode).to.equal(400);
        });

        it("Should return timeslot with id ", async () => {
            const res = await exec();
            expect(res.body._id).to.be.ok;
        });

    });


    describe('GET /', () => {
        let timeSlot;

        beforeEach(async () => {
            timeSlot = new TimeSlot( {
                user: user.id,
                timeStart: 50400,
                timeEnd: 53940
            });

            await timeSlot.save();
        });

        const exec = () => {
            return request(server)
                .get("/api/timeSlots");
        };

        it("Should return list with one timeSlot", async () => {
            const res = await exec();
            expect(res.body.length).to.equal(1);
        });
    });

});
