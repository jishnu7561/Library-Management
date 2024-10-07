import axios from "axios";

axios.defaults.baseURL = "http://13.49.145.178:8080"

// const getAuthToken = () => {
//     return window.localStorage.getItem("auth_token");
// }  

// const request = ( method, url, data ) =>{

//     let headers = {};
//     if (getAuthToken != null){
//         headers = {'Authorization': `Bearer ${getAuthToken()}`};
//         return axios({
//             method,
//             url,
//             headers,
//             data
//         })
//     }
//     return axios({
//         method,
//         url,
//         data
//     })
// }

export const getAuthToken = () => {
    return window.localStorage.getItem("auth_token");
}  

export const setAuthToken = (token) => {
    return window.localStorage.setItem("auth_token",token);
}


const request = (method, url, data) => {
    let headers = {};
    const formData = new FormData();
    console.log(getAuthToken())

    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`};

        // if (data.file) {
        //     console.log('file exists', data.file);
        //     // headers['Content-Type'] = 'multipart/form-data';

        //     Object.entries(data).forEach(([key, value]) => {
        //         formData.append(key, value);
        //     });

        //     return axios({
        //         method: method,
        //         url: url,
        //         headers: headers,
        //         data: formData,
        //     });
        // }
    }

    return axios({
        method,
        url,
        headers,
        data,
    });
};


export default request;
