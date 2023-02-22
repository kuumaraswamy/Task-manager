const request = require('supertest')
const app = require('../App')

beforeEach(()=>{
    console.log("before each")
})

test('Should signup a user', async() => {
  await request(app).post('/users/login').send({
    name: 'kumaraswamy',
    email: 'kuumaraswamy@gmail.com',
    password: 'kumar1234567'
  }).expect(201)
})
