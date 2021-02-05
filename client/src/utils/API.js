import axios from 'axios';

const calls = {
    getUserData: ({userAuthId}) => {
        return new Promise(function(resolve, reject){
            axios.get("/api/user/"+userAuthId).then(data => {
                resolve(data);
            });
        });
    }
}

export default calls;