const {User} = require('../../models/user');
const request = require('supertest');
let assert = require('assert');
const app = require('../..');
let server;
const config = require('config');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;
chai.should();

describe('/api/users', () => {
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
        // await removeAllCollections();
    });

    describe('POST /', () => {

        beforeEach(() => {

        });

        const exec = () => {
            return request(server)
                .post("/api/users")
                .send(user);
        };

        it("Should return user with id when adding correct name", async () => {
            const res = await exec();
            expect(res.body._id).to.be.ok;
        });


        // 400 if random parameter in body is passed
        it('Should return 400 if  random parameter in body is passed', async () => {
            user = {hej: "12345"};
            const res = await exec();
            expect(res.statusCode).to.equal(400);
        });

        it("Should be required to provide name of user", async () => {
            user = {};
            const res = await exec();
            expect(res.statusCode).to.equal(400);
        });

    });

});
