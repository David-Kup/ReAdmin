


export const authHeader = () => {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token){
        return {
            'Authorization': 'Bearer ' + user.token,
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        }
    } else {
        return {};
    }
}

export const handleResponse = async (response, onError) => {
    const res = await response;
    const text = await res.text();

    const data = text && JSON.parse(text);
    if (!res.ok){
        if (res.status === 401 && onError){
            onError();
        }

        const error = (data && data.message) || res.statusText;
        throw new Error(error);
    }

    return data;
}

export const isEmailValid = val => {
    let email = val;
    let pattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email).toLowerCase());
  };
  
  export const isPhoneValid = val => {
    let phone = val;
    let pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return pattern.test(String(phone).toLowerCase());
  };