import request from '../../../utils/request';

// export function fetch() {
//   return request(`/api/notifications`);
// }

//根据大类查询小类列表。
export function fetchDetail_(id){
    return request(`/api/queryDetail?id=${id}`);
}