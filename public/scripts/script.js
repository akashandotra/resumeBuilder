window.addEventListener('DOMContentLoaded', (event)=>{
    const validateSignup = () => {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#psw").value;
        const repeatPass = document.querySelector("#psw-repeat").value;
    
        if(email.length > 5 && password.length > 3 && password===repeatPass){
            postData('/createAccount', { 
                email: email,
                password: password,
            })
            .then(data => {
                console.log(data); // JSON data parsed by `data.json()` call
            });
            return true;
        }
        else{ 
            alert("Please fill correct details");
            console.log("false")    
            return false;
        }
    }
    document.querySelector("#registerbtn").addEventListener("click", validateSignup);
});

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }