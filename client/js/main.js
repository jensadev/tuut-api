/*
 * Hämta element från DOM och skapa en variabel med referensen till dem
 */
const alertBox = document.getElementById('alert-box');
const tuutsStream = document.getElementById('tuuts-stream');
const registrationForm = document.getElementById("registration-form");
const loginForm = document.getElementById("login-form");
const logoutForm = document.getElementById('logout-form');
const postForm = document.getElementById("post-form");
const signinLink = document.getElementById('signin-link');
const signupLink = document.getElementById('signup-link');

/*
 * Kontrollera om användaren är inloggad.
 */

let token = null;
var currentPage = 0;
let perPage = 10;

try {
    token = getWithExpiry('token');
} catch (error) {
    console.log(error);
    alertBox.textContent = error;
}

if (token) {
    toggle(document.querySelector(".registration-links"));
    toggle(logoutForm);
    toggle(postForm);
    alertBox.textContent = "You are logged in";
}

/*
 * Visa tuut stream
 */

getTuuts(currentPage).then((response) => {
    if (response.success == "1") {
        tuutsStream.innerHTML = "";
        response.data.forEach(tuut => {
            tuutsStream.appendChild(htmlTuut(tuut));
        });
        currentPage = response.currentPage;
        paginate(response.pageCount);
    }
});

/*
 * Posta nya tuuts
 */
postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputBody = document.getElementById("input-body");

    // validate

    let bodyParams = {
        body: inputBody.value
    }
    
    post(bodyParams).then((response) => {
        // console.log(response.data.insertId);
        location.reload();
    }).catch((error) => {
        console.log(error);
    })

});

/*
 * Metod för att sköta login, binder till form elementet för att logga in.
 * Vid korrekt login så sparar den en lokal token för identifikation.
 */
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputName = document.getElementById("username");
    let inputPassword = document.getElementById("current-password");

    // validate

    let bodyParams = {
        name: inputName.value,
        password: inputPassword.value
    }
    
    login(bodyParams).then((response) => {
        console.log(response);
        if (response.success == "1") {
            console.log("logged in");
            setWithExpiry('token', response.token, 3600000); // 3 600 000
            token = response.token;
            toggle(loginForm);
            toggle(document.querySelector(".registration-links"));
            toggle(logoutForm);
            toggle(postForm);
            //alertBox.textContent = "You are logged in";
            alertMessage(alertBox, "You are logged in");
        } else {
            alertMessage(alertBox, response.message);
        }
    }).catch((error) => {
        console.log(error);
    })
});

/*
 * Registrera en ny användare
 */
registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputName = document.getElementById("new-username");
    let inputEmail = document.getElementById("new-email");
    let inputPassword = document.getElementById("new-password");

    // validate

    let bodyParams = {
        name: inputName.value,
        email: inputEmail.value,
        password: inputPassword.value
    }
    
    register(bodyParams).then((response) => {
        console.log(response);
        if (response.success == "1") {
        //     console.log("logged in");
        //     setWithExpiry('token', response.token, 3600000); // 3 600 000
        //     token = response.token;
        //     toggle(loginForm);
        //     toggle(document.querySelector(".registration-links"));
        //     toggle(logoutForm);
        //     toggle(postForm);
        //     //alertBox.textContent = "You are logged in";
            alertMessage(alertBox, "Registration successfull");
        } else {
            alertMessage(alertBox, response.message);
        }
    }).catch((error) => {
        console.log(error);
    })
});

/*
 * Logout
 */
logoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    logout().then((response) => {
        toggle(loginForm);
        toggle(document.querySelector(".registration-links"));
        toggle(logoutForm);
        toggle(postForm);
        alertMessage(alertBox, "You are logged out");
    });
});

/*
 * Sign in sign up
 */
signinLink.addEventListener('click', (e) => {
    e.preventDefault();
    toggle(loginForm);
})

signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    toggle(registrationForm);
})

/*
 * Localstorage expiry
 * src: https://www.sohamkamani.com/blog/javascript-localstorage-with-ttl-expiry/
 */

function setWithExpiry(key, value, ttl) {
    const now = new Date()
    
    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
      const item = {
          value: value,
          expiry: now.getTime() + ttl
      }
      localStorage.setItem(key, JSON.stringify(item))
}

function getWithExpiry(key) {
	const itemStr = localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key)
		return null
	}
	return item.value
}