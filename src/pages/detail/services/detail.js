import request from '../../../utils/request';

//查询相信信息；
export function fetchDetail_(id){
    return request(`/api/queryArticleById?id=${id}`);
}
export function queryFavorByUserIdAndArticleId(payload){
    const { userId, articleId } = payload;
    return request(`/api/user/queryFavorByUserIdAndArticleId?userId=${userId}&articleId=${articleId}`);
}

export function addFavor(payload){
    const { userId, articleId } = payload;
    let formData = new FormData();
    formData.append("userId",userId);
    formData.append("articleId",articleId);

    return request(`/api/user/addFavor`,{ method: 'POST',body: formData});
}

export function removeFavor(payload){
    const { userId, articleId } = payload;
    return request(`/api/user/removeFavor?userId=${userId}&articleId=${articleId}`);
}



