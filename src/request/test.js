import request from './config';

export function testFetch() {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username: 'admin',
    },
  });
}
