const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const should = chai.should();
const CartModel = require('../src/models/cart.model.js');

chai.use(chaiHttp);

describe('Carts API', () => {

    before(async () => {
        await CartModel.deleteMany({});
    });

    describe('/POST cart', () => {
        it('debería crear un nuevo carrito', (done) => {
            let cart = {
                products: [{ productId: '60d21b9967d0d8992e610c85', quantity: 2 }]
            };

            chai.request(server)
                .post('/api/carts')
                .send(cart)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('products');
                    res.body.products.should.be.a('array');
                    res.body.products[0].should.have.property('quantity').eql(2);
                    done();
                });
        });
    });

    describe('/PUT/:id cart', () => {
        it('debería actualizar un carrito existente', (done) => {
            let cart = new CartModel({
                products: [{ productId: '60d21b9967d0d8992e610c85', quantity: 2 }]
            });

            cart.save((err, cart) => {
                chai.request(server)
                    .put(`/api/carts/${cart.id}`)
                    .send({ products: [{ productId: '60d21b9967d0d8992e610c85', quantity: 3 }] })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('products');
                        res.body.products[0].should.have.property('quantity').eql(3);
                        done();
                    });
            });
        });
    });
});
