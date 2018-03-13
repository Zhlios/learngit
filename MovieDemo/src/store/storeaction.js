
// 倒出修改username的值
export function getUserName(username){
    return{
        type: 'user_name',   
        UserName:username,
    }
};