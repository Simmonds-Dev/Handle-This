document.addEventListener("DOMContentLoaded", () => {
    const commentButtons = document.querySelectorAll("#viewPostBtn");

    commentButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const postId = event.target.dataset.postId;
            window.location.href = `/post/${postId}`;  // Navigate to post detail view
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const postMeta = document.getElementById("post-meta");

    if (!postMeta) {
        console.warn("User not logged in or #post-meta not found.");
        return; // Don't run any comment-related logic if not logged in
    }

    const postId = postMeta.dataset.postId;
    const currentUserId = postMeta.dataset.userId;

    const form = document.getElementById("comment-form");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const content = document.getElementById("comment-content").value.trim();

            if (content) {
                const response = await fetch("/api/comments", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ content, post_id: postId })
                });

                if (response.ok) {
                    location.reload();
                } else {
                    alert("Failed to post comment.");
                }
            }
        });
    }

    const editBtn = document.getElementById("edit-post-btn");
    const deleteBtn = document.getElementById("delete-post-btn");

    const modal = document.getElementById("editPostModal");
    const closeModal = document.getElementById("closeModal");
    const saveBtn = document.getElementById("savePostEditBtn");
    const textarea = document.getElementById("editPostTextarea");

    if (editBtn && modal && textarea && saveBtn) {
        editBtn.addEventListener("click", () => {
            // Pre-fill with current post content
            const currentPostContent = document.querySelector("p[data-post-content]");
            if (currentPostContent) {
                textarea.value = currentPostContent.textContent;
            }
            modal.classList.remove("hidden");
        });

        closeModal.addEventListener("click", () => {
            modal.classList.add("hidden");
        });

        saveBtn.addEventListener("click", async () => {
            const newContent = textarea.value.trim();
            if (newContent) {
                const postId = document.getElementById("post-meta").dataset.postId;

                const response = await fetch(`/api/post/${postId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ post_content: newContent }),
                });

                if (response.ok) {
                    location.reload();
                } else {
                    alert("Edit failed.");
                }
            }
        });
    }

    if (deleteBtn) {
        deleteBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this post?")) {
                fetch(`/api/post/${postId}`, {
                    method: "DELETE"
                }).then(res => res.ok ? window.location.href = "/" : alert("Delete failed."));
            }
        });
    }
});

