const request = require('supertest');
const app = require('../app');
const customer_data = require('../data/customers.json');

describe('Home', () => {
    it('Test home response text', async () => {
        const response = await request(app).get('/');
        expect(response.text).toBe('{"body":{"message":"Orders API Home"}}');
    });
    it('Test home status code', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });  
  });
  describe('Create Customer EndPoints', () => {
    it('should create a new post', async () => {
        const res = await request(app)
          .post('/customers/create')
          .send(customer_data[0])
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('orders')
        expect(res.body).toHaveProperty('_id')
        expect(res.body).toHaveProperty('address')
        expect(res.body).toHaveProperty('age')
        expect(res.body.firstName).toBe(customer_data[0]['firstName'])
        expect(res.body.lastName).toBe(customer_data[0]['lastName'])     
        expect(res.body.phoneNumber).toBe(customer_data[0]['phoneNumber'])
      })
});

describe('Create Order EndPoints', () => {
  it('should create a new post', async () => {
      const res = await request(app)
        .post('/customers/6035cc55989c031278d39093/orders/create')
        .send({
          "description" : "type_1"
        })
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('customer')
      expect(res.body).toHaveProperty('_id')
      expect(res.body).toHaveProperty('order_date')
      expect(res.body.description).toBe("type_1")
    })
});




