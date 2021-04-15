export const authenticate={
    signin: (token)=>{localStorage.setItem("token",token)},
    signout:()=>{localStorage.removeItem("token")},
    getToken:(token)=>{
        const localToken = localStorage.getItem(token);
        return localToken
    },
    checkAuthenticate:()=>{
        if(localStorage.getItem('token')) return true ;
        return false
    }
}