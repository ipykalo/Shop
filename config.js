const ROUTES = {
    INDEX: '/',
    PRODUCTS: '/products',
    PRODUCT_DETAIL: '/product-detail',
    CHECKOUT: '/checkout',
    CART: '/cart',
    ORDERS: '/orders',
    ADD_TO_CART: '/add-to-cart',
    ADMIN_PRODUCTS: '/admin/products',
    ADMIN_ADD_PRODUCT: '/admin/add-product',
    ADMIN_EDIT_PRODUCT: '/admin/edit-product',
    ADMIN_DELETE_PRODUCT: '/admin/delete-product'
}

const PAGES = {
    shop: {
        view: '',
        pageTitle: 'Shop',
        menuItem: 'Shop',
        image: '',
        route: ROUTES.INDEX
    },
    productList: {
        view: 'shop/product-list',
        pageTitle: 'Shop',
        menuItem: 'All Products',
        image: '/images/book.jpg',
        route: ROUTES.PRODUCTS
    },
    productDetail: {
        view: 'shop/product-detail',
        pageTitle: 'Shop',
        menuItem: 'Product Detail',
        image: '',
        route: ROUTES.PRODUCT_DETAIL
    },
    checkout: {
        view: 'shop/checkout',
        pageTitle: 'Checkout',
        menuItem: 'Checkout',
        image: '',
        route: ROUTES.CHECKOUT
    },
    cart: {
        view: 'shop/cart',
        pageTitle: 'Your Cart',
        menuItem: 'Cart',
        image: '',
        route: ROUTES.CART
    },
    index: {
        view: 'shop/index',
        pageTitle: 'Shop',
        menuItem: 'Index',
        image: '',
        route: ROUTES.INDEX
    },
    orders: {
        view: 'shop/orders',
        pageTitle: 'Shop',
        menuItem: 'Orders',
        image: '',
        route: ROUTES.ORDERS
    },
    products: {
        view: 'admin/products',
        pageTitle: 'Admin Products',
        menuItem: 'Admin Products',
        image: '',
        route: ROUTES.ADMIN_PRODUCTS
    },
    addProduct: {
        view: 'admin/add-product',
        pageTitle: 'Add Product',
        menuItem: 'Add Product',
        image: '',
        route: ROUTES.ADMIN_ADD_PRODUCT
    },
    editProduct: {
        view: 'admin/edit-product',
        pageTitle: 'Edit Product',
        menuItem: 'Edit Product',
        image: '',
        route: ROUTES.ADMIN_EDIT_PRODUCT
    },
    notFound: {
        view: '404',
        pageTitle: 'Page Not Found',
        route: ''
    }
}

module.exports = {
    routes: ROUTES,
    pages: PAGES,
    classes: {
        active: 'active'
    }
}