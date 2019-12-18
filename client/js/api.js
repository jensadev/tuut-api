/*
 * Async metoder för att prata med API
 */

async function login(body) {
    let config = {
        headers: {'content-type': 'application/json'}
    };    
    try {
        const response = await axios.post('http://localhost:3000/users/login',
            body,
            config
        );
        //console.log(response);
        //token = JSON.parse(response.request.responseText).token;
        return response.data;
    } catch (error) {
        //console.log(error);
        return error;
    }
}

async function register(body) {
    let config = {
        headers: {'content-type': 'application/json'}
    };    
    try {
        const response = await axios.post('http://localhost:3000/users',
            body,
            config
        );
        //console.log(response);
        //token = JSON.parse(response.request.responseText).token;
        return response.data;
    } catch (error) {
        //console.log(error);
        return error;
    }
}

async function getTuuts(page) {
    let config = {
        headers: {'content-type': 'application/json'}
    };
    try {
        const response = await axios.get('http://localhost:3000/tuuts/' + page, config);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function post(body) {
    let config = {
        headers: {
            'Authorization': "bearer " + token,
            'content-type': 'application/json'
        }
    };
    try {
        const response = await axios.post('http://localhost:3000/tuuts',
            body,
            config
        );
        return response.data;
    } catch (error) {
        return error;
    }
}

async function getUsers() {
    let config = {
        headers: {
            'Authorization': "bearer " + token,
            'content-type': 'application/json'
        }
    };
    try {
        const response = await axios.get('http://localhost:3000/users', config);
        console.log(response.request.responseText);
    } catch (error) {
        console.error(error);
    }
}

async function logout() {
    try {
        localStorage.removeItem('token');
        token = null;
        console.log("logout");
        return "logged out";
    } catch (error) {
        console.error(error);
    }
}