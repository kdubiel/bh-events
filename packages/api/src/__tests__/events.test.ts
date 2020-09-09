import { EventController } from 'controllers';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { Application } from '../app';

const request = supertest(
  new Application([new EventController('/events')], false).start(5555)
);

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany({});
  }
}

describe('/events', () => {
  beforeAll(async () => {
    const url = `mongodb://0.0.0.0:27017/kdml-test-events?readPreference=primary&ssl=false`;
    await mongoose.connect(url, { useNewUrlParser: true });
  });

  afterEach(async () => {
    await removeAllCollections();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should respond on get request', async () => {
    const response = await request.get('/events');

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  it('should correctly add event to database', async () => {
    const mockEvent = {
      title: 'TestEvent',
      date: new Date(1993, 10, 18),
      user: {
        firstName: 'Kamil',
        lastName: 'Dubiel',
        email: 'kamdubdev@gmail.com',
      },
    };

    const response = await request.post('/events').send({ data: mockEvent });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('TestEvent');
  });

  it('should correctly respond with event by id', async () => {
    const mockEvent = {
      title: 'TestEvent',
      date: new Date(1993, 10, 18),
      user: {
        firstName: 'Kamil',
        lastName: 'Dubiel',
        email: 'kamdubdev@gmail.com',
      },
    };

    const postResponse = await request
      .post('/events')
      .send({ data: mockEvent });

    expect(postResponse.status).toBe(200);
    expect(postResponse.body.title).toBe('TestEvent');

    const createdId = postResponse.body._id;

    const getResponse = await request.get(`/events/${createdId}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.title).toBe('TestEvent');
  });
});
