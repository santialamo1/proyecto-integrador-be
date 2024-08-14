const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const should = chai.should();

chai.use(chaiHttp);

describe('Sessions API', () => {

    describe('/GET current session', () => {
        it('debería obtener la sesión actual', (done) => {
            chai.request(server)
                .get('/api/sessions/current')
                .set('Authorization', 'Bearer ${token}')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('email');
                    done();
                });
        });
    });
});
