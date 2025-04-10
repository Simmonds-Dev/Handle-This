const logoutBtn = document.querySelector('#logoutBtn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        const response = await fetch('/api/user/logout', {
            method: 'POST',
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log out');
        }
    });
}
