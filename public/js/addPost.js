document.addEventListener('DOMContentLoaded', () => {
    const addPostBtn = document.getElementById('addPost');

    if (addPostBtn) {
        addPostBtn.addEventListener('click', async () => {
            try {
                const response = await fetch('/api/post', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    document.location.replace("/post");
                } else {
                    console.error('Failed to fetch post:', response.statusText);
                }
            } catch (err) {
                console.error('Error:', err);
            }
        });
    }
});
