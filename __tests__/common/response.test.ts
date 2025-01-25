import request from 'supertest';
import {testApp as app} from '../apps/testapp'

describe('formatResponse', () => {
  it('should return a formatted success response', async () => {
    const res = await request(app).get('/test')
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toBe('success');
  });

  it('should return a formatted error response', async () => {
    const res = await request(app).get('/test-error')
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toBe('error');
  });
});