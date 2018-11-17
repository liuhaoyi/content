import request from '../../../utils/request';

//查询相信信息；
export function fetchDetail_(id){
    return request(`/api/queryArticleById?id=${id}`);
}