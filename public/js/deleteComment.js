document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.delete-comment-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            const commentId = event.target.dataset.commentId;

            if (confirm('Are you sure you want to delete this comment?')) {
                try {
                    const response = await fetch(`/api/comment/${commentId}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        location.reload();
                    } else {
                        console.error('Failed to delete comment');
                    }
                } catch (err) {
                    console.error('Error deleting comment:', err);
                }
            }
        });
    });
});
