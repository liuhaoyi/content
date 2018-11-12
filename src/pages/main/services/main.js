import request from '../../../utils/request';

//查询大类列表。
export function fetchBigCatalog(){
    return request(`/api/queryBigCatalog`);
}

export function fetchMainPicList(){
    return request(`/api/queryMainPicList`);
}
