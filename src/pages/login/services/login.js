import request from '../../../utils/request';

//登录{phone,userId,password}
export function login(values){
  
  const {loginName, phone, userNo} = values;
  return request(`/api/login?loginName=${loginName}&phone=${phone.replace(/\s+/g,"")}&userNo=${userNo}`);

}