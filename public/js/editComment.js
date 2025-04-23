document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.edit-comment-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            const commentId = event.target.dataset.commentId;

            const commentElement = document.querySelector(`.comment[data-comment-id="${commentId}"]`);
            const commentText = commentElement.querySelector('.comment-text').innerText.split(': ')[1];

            // Show modal
            const modal = document.getElementById('editCommentModal');
            const textarea = document.getElementById('editCommentTextarea');
            textarea.value = commentText;
            modal.classList.remove('hidden');

            // Save changes
            document.getElementById('saveCommentEditBtn').onclick = async () => {
                const updatedContent = textarea.value.trim();
                if (!updatedContent) return;

                try {
                    const response = await fetch(`/api/comment/${commentId}`, {
                        method: 'PUT',
                        body: JSON.stringify({ content: updatedContent }),
                        headers: { 'Content-Type': 'application/json' },
                    });

                    if (response.ok) {
                        location.reload();
                    } else {
                        console.error('Failed to update comment');
                    }
                } catch (err) {
                    console.error('Error updating comment:', err);
                }
            };

            // Close modal
            document.getElementById('closeCommentModal').onclick = () => {
                modal.classList.add('hidden');
            };
        });
    });
});
