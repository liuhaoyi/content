import request from '../../../utils/request';

//根据大类查询小类列表。
export function fetchSmallCatalog(bigCatalog){
    return request(`/api/querySmallCatalog?bigCatalog=${bigCatalog}`);
}