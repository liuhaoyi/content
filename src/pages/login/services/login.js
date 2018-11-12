import request from '../../../utils/request';

//登录{phone,userId,password}
export function auth(values){
  return request('/api/login', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}