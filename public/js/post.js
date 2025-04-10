const postFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post_title');
    const content = document.querySelector('#post_content');

    if (title && content) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({
                post_title: title.value.trim(),
                post_content: content.value.trim()
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#postForm').addEventListener('submit', postFormHandler);