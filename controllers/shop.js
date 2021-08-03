const config = require('../config');
const Product = require('../models/product');

exports.getProducts = (req, res) => {
    Product.fetchAll()
        .then(products => {
            res.render(config?.pages?.productList?.view, {
                config,
                products: products,
                path: config?.pages?.productList?.route,
                pageTitle: config?.pages?.productList?.pageTitle
            });
        })
        .catch(err => console.log(err, 'getProducts'));
}

exports.getProduct = (req, res) => {
    console.log(req.params.id, 'req.params.id')
    Product.fetchOne(req.params.id)
        .then(product => {
            console.log(product);
            res.render(config?.pages?.productDetail?.view, {
                config,
                product: product,
                path: config?.routes.PRODUCTS,
                pageTitle: config?.pages?.productDetail?.pageTitle
            });
        })
        .catch(err => console.log(err, 'getProduct'));
}

exports.getIndex = (req, res) => {
    Product.fetchAll()
        .then(products => {
            res.render(config?.pages?.index?.view, {
                config,
                products: products,
                path: config?.pages?.index?.route,
                pageTitle: config?.pages?.index?.pageTitle
            });
        })
        .catch(err => console.log(err, 'getProducts'));
}

exports.getCart = (req, res) => {
    req.user.getCart()
        .then(cart => cart.getProducts())
        .then(products => {
            res.render(config?.pages?.cart?.view, {
                config,
                products: products,
                path: config?.pages?.cart?.route,
                pageTitle: config?.pages?.cart?.pageTitle
            });
        })
        .catch(err => console.log(err, 'getCart'))
}

exports.addToCart = (req, res) => {
    let cart;
    req.user.getCart()
        .then(fetchedCart => {
            cart = fetchedCart;
            return fetchedCart.getProducts({ where: { id: req?.body?.id } });
        })
        .then(([product]) => product ? product : Product.findByPk(req?.body?.id))
        .then(product => {
            const quantity = product?.cartProduct ? product.cartProduct.quantity + 1 : 1;
            return cart.addProduct(product, { through: { quantity } });
        })
        .then(() => res.redirect(config.routes.CART))
        .catch(err => console.log(err, 'addToCart'));
}

exports.deleteFromCart = (req, res) => {
    req.user.getCart()
        .then(fetchedCart => {
            return fetchedCart.getProducts({ where: { id: req?.body?.id } });
        })
        .then(([product]) => product ? product.cartProduct.destroy() : null)
        .then(() => res.redirect(config.routes.CART))
        .catch(err => console.log(err, 'deleteFromCart'));
}

exports.getCheckout = (req, res) => {
    res.render(config?.pages?.checkout?.view, {
        config,
        path: config?.pages?.checkout?.route,
        pageTitle: config?.pages?.checkout?.pageTitle
    });
}

exports.getOrders = (req, res) => {
    req.user.getOrders({ include: 'products' })
        .then(orders => {
            res.render(config?.pages?.orders?.view, {
                config,
                orders,
                path: config?.pages?.orders?.route,
                pageTitle: config?.pages?.orders?.pageTitle
            });
        })
        .catch(err => console.log(err, 'getOrders'));
}

exports.createOrder = (req, res) => {
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            return req.user.createOrder()
                .then(order => {
                    return order.addProducts(
                        products.map(product => {
                            product.orderProduct = { quantity: product.cartProduct.quantity };
                            return product;
                        })
                    );
                });
        })
        .then(() => fetchedCart.setProducts(null))
        .then(() => res.redirect(config.routes.ORDERS))
        .catch(err => console.log(err, 'createOrder'));
}