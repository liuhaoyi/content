import request from '../../../utils/request';

export function fetch() {
  return request(`/api/notifications`);
}
export function fetchMessages(notification) {
  const id = notification._targetId;
  return request(`/api/messages?_toId=${id}`);
}

export function sendMessages(values){
  return request('/api/messages', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}