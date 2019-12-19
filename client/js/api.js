const host = "http://localhost:3000";

/*
 * Async metoder för att prata med API
 */
async function login(body) {
    let config = {
        headers: {'content-type': 'application/json'}
    };    
    try {
        const response = await axios.post(host + '/users/login',
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
        const response = await axios.post(host + '/users',
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

// skitkorv pagination pajjar 
async function getTuuts(page) {
    let config = {
        headers: {'content-type': 'application/json'}
    };
    try {
        const response = await axios.get(host + '/tuuts/' + page, config);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function getTuutById(id) {
    let config = {
        headers: {
            'content-type': 'application/json'
        }
    };
    try {
        const response = await axios.get(host + '/tuuts/' + id, config);
        console.log(response);
        return response.request.responseText;
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
        const response = await axios.post(host + '/tuuts',
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
        const response = await axios.get(host + '/users', config);
        // console.log(response.request.responseText);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function getUserById(id) {
    let config = {
        headers: {
            'Authorization': "bearer " + token,
            'content-type': 'application/json'
        }
    };
    try {
        const response = await axios.get(host + '/users/' + id, config);
        // console.log(response.request.responseText);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function logout() {
    try {
        localStorage.removeItem('token');
        token = null;
        return "logged out";
    } catch (error) {
        console.error(error);
        return error;
    }
}