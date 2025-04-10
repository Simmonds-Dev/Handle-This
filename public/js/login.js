const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector("#emailLogin").value.trim();
    const password = document.querySelector("#passwordLogin").value.trim();

    if (email && password) {
        try {
            const response = await fetch("/api/user/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                document.location.replace("/"); 
            } else {
                alert("Login failed: " + response.statusText);
            }
        } catch (err) {
            console.error("Error during login:", err);
        }
    }
};

document
    .querySelector("#loginForm")
    .addEventListener("submit", loginFormHandler);
