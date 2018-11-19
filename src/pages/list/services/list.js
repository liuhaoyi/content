import request from '../../../utils/request';

//根据大类查询小类列表。
export function fetchSmallCatalog(bigCatalog){
    return request(`/api/querySmallCatalog?bigCatalog=${bigCatalog}`);
}

//查询最近时间点之前的N条新闻；
export function fetchBeforeNewsList(catalog,time) {
  return request(`/api/queryBeforeNewsList?smallCatalog=${catalog}&time=${time}`);
}

//查询最近时间点之后的所有新闻；
export function fetchAfterNewsList(catalog,time) {
    return request(`/api/queryAfterNewsList?smallCatalog=${catalog}&time=${time}`);
}

//查询挑剔；
export function fetchSearch(title){
    return request(`/api/search?title=${title}`);
}
