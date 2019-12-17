const loginForm = document.getElementById("login_form");

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let nameInput = document.getElementById("input_name");
    let passwordInput = document.getElementById("input_password");
    let bodyParams = {
        name: nameInput.value,
        password: passwordInput.value
    }
    login(bodyParams);
});


var config = {
    headers: {'content-type': 'application/json'}
};

var bodyParameters = {
   "name": "jens",
   "password": "Secret123"
}

let token;

async function login(body) {
    try {
        const response = await axios.post('http://localhost:3000/users/login',
            body,
            config
        );
        console.log(response);
        token = JSON.parse(response.request.responseText).token;
    } catch (error) {
        console.log(error);
    }
}

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getTuuts() {
    try {
        const response = await axios.get('http://localhost:3000/tuuts', config);
        console.log(response.request.responseText);
    } catch (error) {
        console.error(error);
    }
}

async function getUsers() {
    config = {
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