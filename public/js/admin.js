const onDeleteProduct = (id, route, csrfToken) => {
    if (!id || !route) {
        return;
    }
    fetch(`${route}/${id}`, {
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
}
