const ROUTES = {
    INDEX: '/',
    PRODUCTS: '/products',
    PRODUCT_DETAIL: '/product-detail',
    PRODUCT_DETAIL_ID: '/product-detail/:id',
    CHECKOUT: '/checkout',
    CART: '/cart',
    ORDERS: '/orders',
    ADD_TO_CART: '/add-to-cart',
    DELETE_FROM_CART: '/delete-from-cart',
    ADMIN_PRODUCTS: '/admin/products',
    ADMIN_ADD_PRODUCT: '/admin/add-product',
    ADMIN_EDIT_PRODUCT: '/admin/edit-product',
    ADMIN_EDIT_PRODUCT_ID: '/admin/edit-product/:id',
    ADMIN_DELETE_PRODUCT: '/admin/delete-product',
    ADMIN_DELETE_PRODUCT_ID: '/admin/delete-product/:id'
}

const PAGES = {
    shop: {
        view: '',
        pageTitle: 'Shop',
        menuItem: 'Shop',
        route: ROUTES.INDEX
    },
    productList: {
        view: 'shop/product-list',
        pageTitle: 'Shop',
        menuItem: 'All Products',
        route: ROUTES.PRODUCTS
    },
    productDetail: {
        view: 'shop/product-detail',
        pageTitle: 'Shop',
        menuItem: 'Product Detail',
        route: ROUTES.PRODUCT_DETAIL_ID
    },
    checkout: {
        view: 'shop/checkout',
        pageTitle: 'Checkout',
        menuItem: 'Checkout',
        route: ROUTES.CHECKOUT
    },
    cart: {
        view: 'shop/cart',
        pageTitle: 'Your Cart',
        menuItem: 'Cart',
        route: ROUTES.CART
    },
    index: {
        view: 'shop/index',
        pageTitle: 'Shop',
        menuItem: 'Index',
        route: ROUTES.INDEX
    },
    orders: {
        view: 'shop/orders',
        pageTitle: 'Shop',
        menuItem: 'Orders',
        route: ROUTES.ORDERS
    },
    products: {
        view: 'admin/products',
        pageTitle: 'Admin Products',
        menuItem: 'Admin Products',
        route: ROUTES.ADMIN_PRODUCTS
    },
    addProduct: {
        view: 'admin/add-product',
        pageTitle: 'Add Product',
        menuItem: 'Add Product',
        route: ROUTES.ADMIN_ADD_PRODUCT
    },
    editProduct: {
        view: 'admin/edit-product',
        pageTitle: 'Edit Product',
        menuItem: 'Edit Product',
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