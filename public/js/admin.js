
const btn = document.getElementById('deleteProduct');

btn?.addEventListener('click', () => {
    const id = btn.getAttribute('productId');
    const csrfToken = btn.getAttribute('csrfToken');

    fetch(`/admin/delete-product/${id}`, {
        method: 'DELETE',
        headers: {
            'csrf-token': csrfToken
        }
    })
        .then(resp => {
            if (resp?.status === 200) {
                document.getElementById(id)?.remove();
            }
        });
})