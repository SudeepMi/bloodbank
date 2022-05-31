import Api from "./Api";

const User = () =>{
    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
    
    if(localStorage.getItem('token') && localStorage.getItem('user')){
        const profile = () => {
            if(localStorage.getItem('profile')){
            const user = JSON.parse(localStorage.getItem('profile'))
            return user;
            }
            return null;
        }
       return {
            user: JSON.parse(localStorage.getItem('user')),
            token: localStorage.getItem('token'),
            logOut: logOut,
            profile: profile
       }
    }
    return false;
}

export default User;