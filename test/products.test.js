const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const should = chai.should();
const ProductModel = require('../src/models/product.model.js');

chai.use(chaiHttp);

describe('Products API', () => {

    before(async () => {
        await ProductModel.deleteMany({});
    });

    describe('/POST product', () => {
        it('debería crear un nuevo producto', (done) => {
            let product = {
                name: 'Test Product',
                price: 100,
                description: 'A product for testing'
            };

            chai.request(server)
                .post('/api/products')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql('Test Product');
                    res.body.should.have.property('price').eql(100);
                    done();
                });
        });

        it('no debería crear un producto sin precio', (done) => {
            let product = {
                name: 'Invalid Product',
                description: 'A product without price'
            };

            chai.request(server)
                .post('/api/products')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('message').eql('Price is required');
                    done();
                });
        });
    });

    describe('/GET products', () => {
        it('debería obtener todos los productos', (done) => {
            chai.request(server)
                .get('/api/products')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });

    describe('/GET/:id product', () => {
        it('debería obtener un producto por su id', (done) => {
            let product = new ProductModel({
                name: 'Another Test Product',
                price: 150,
                description: 'Another product for testing'
            });

            product.save((err, product) => {
                chai.request(server)
                    .get(`/api/products/${product.id}`)
                    .send(product)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name').eql('Another Test Product');
                        res.body.should.have.property('price').eql(150);
                        res.body.should.have.property('_id').eql(product.id);
                        done();
                    });
            });
        });
    });
});
