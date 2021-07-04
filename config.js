module.exports = {
    pages: {
        shop: {
            view: 'shop',
            pageTitle: 'Shop',
            menuItem: 'Shop',
            cardImage: '/images/book.jpg',
            route: '/',
            fullRoute: '/'
        },
        addProduct: {
            view: 'add-product',
            pageTitle: 'Add Product',
            menuItem: 'Add Product',
            route: '/add-product',
            fullRoute: '/add-product'
        },
        notFound: {
            view: '404',
            pageTitle: 'Page Not Found',
            route: '',
            fullRoute: ''
        }
    },
    classes: {
        active: 'active'
    }
}