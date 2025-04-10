const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#usernameSignup');
    const email = document.querySelector('#emailSignup');
    const password = document.querySelector('#passwordSignup');

    if (username && email && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({
                username: username.value,
                email: email.value,
                password: password.value
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
            location.reload()
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#signupForm').addEventListener('submit', signupFormHandler);