const fs = require('fs');
const pdfkit = require('pdfkit');

const config = require('../configs/config');
const Product = require('../models/product');
const Order = require('../models/order');
const helper = require('../util/helper');
const stripe = require('stripe')(config.stripe.sk);

const ITEMS_PER_PAGE = 2;

exports.getProducts = (req, res, next) => {
    const page = +req.query.page || 1;
    Product.find()
        .countDocuments()
        .then(totalRecords => {
            return Product.find()
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
                .then(products => {
                    res.render(config?.pages?.productList?.view, {
                        config,
                        products: products,
                        path: config?.pages?.productList?.route,
                        pageTitle: config?.pages?.productList?.pageTitle,
                        currentPage: page,
                        hasNextPage: ITEMS_PER_PAGE * page < totalRecords,
                        lastPage: Math.ceil(totalRecords / ITEMS_PER_PAGE)
                    });
                })
        })
        .catch(err => next(helper.logError(err, 'getProducts')));
}

exports.getProduct = (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => {
            res.render(config?.pages?.productDetail?.view, {
                config,
                product: product,
                path: config?.routes.PRODUCTS,
                pageTitle: config?.pages?.productDetail?.pageTitle
            });
        })
        .catch(err => next(helper.logError(err, 'getProduct')));
}

exports.getIndex = (req, res, next) => {
    const page = +req.query.page || 1;
    Product.find()
        .countDocuments()
        .then(totalRecords => {
            return Product.find()
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
                .then(products => {
                    res.render(config?.pages?.index?.view, {
                        config,
                        products: products,
                        path: config?.pages?.index?.route,
                        pageTitle: config?.pages?.index?.pageTitle,
                        currentPage: page,
                        hasNextPage: ITEMS_PER_PAGE * page < totalRecords,
                        lastPage: Math.ceil(totalRecords / ITEMS_PER_PAGE)
                    });
                })
        })
        .catch(err => next(helper.logError(err, 'getIndex')));
}

exports.getCart = (req, res, next) => {
    req.user.populate('cart.items.productId')
        .then(products => {
            res.render(config?.pages?.cart?.view, {
                config,
                products: products.cart.items,
                path: config?.pages?.cart?.route,
                pageTitle: config?.pages?.cart?.pageTitle
            });
        })
        .catch(err => next(helper.logError(err, 'getCart')));
}

exports.addToCart = (req, res, next) => {
    Product.findById(req.body.id)
        .then(product => req.user.addToCart(product))
        .then(() => res.redirect(config.routes.CART))
        .catch(err => next(helper.logError(err, 'addToCart')));
}

exports.deleteFromCart = (req, res, next) => {
    req.user.deleteFromCart(req?.body?.id)
        .then(() => res.redirect(config.routes.CART))
        .catch(err => next(helper.logError(err, 'deleteFromCart')));
}

exports.getCheckout = (req, res, next) => {
    let totalSum = 0;
    let products = [];
    req.user.populate('cart.items.productId')
        .then(pr => {
            products = pr.cart.items.map(item => {
                totalSum += item.quantity * item.productId.price;
                return item;
            });
            return stripe.checkout.sessions.create({
                line_items: products.map(item => {
                    return {
                        name: item.productId.title,
                        description: item.productId.description,
                        amount: item.productId.price * 100,
                        currency: 'usd',
                        quantity: item.quantity
                    };
                }),
                payment_method_types: ['card'],
                mode: 'payment',
                success_url: `${req.protocol}://${req.get('host')}${config.routes.CHECKOUT_SUCCESS}`,
                cancel_url: `${req.protocol}://${req.get('host')}${config.routes.CHECKOUT_CANCEL}`
            });
        })
        .then(session => {
            res.render(config?.pages?.checkout?.view, {
                config,
                totalSum,
                products,
                path: config?.pages?.checkout?.route,
                pageTitle: config?.pages?.checkout?.pageTitle,
                sessionId: session.id
            });
        })
        .catch(err => next(helper.logError(err, 'getCheckout')));
}

exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
        .then(orders => {
            res.render(config?.pages?.orders?.view, {
                config,
                orders,
                path: config?.pages?.orders?.route,
                pageTitle: config?.pages?.orders?.pageTitle
            });
        })
        .catch(err => next(helper.logError(err, 'getOrders')));
}

exports.createOrder = (req, res, next) => {
    req.user.populate('cart.items.productId')
        .then(cartProducts => {
            const products = cartProducts.cart.items.map(i => ({ product: { ...i.productId._doc }, quantity: i.quantity }));
            new Order({
                products,
                user: {
                    name: req.user.name,
                    userId: req.user._id
                }
            })
                .save()
        })
        .then(() => req.user.clearCart())
        .then(() => res.redirect(config.routes.ORDERS))
        .catch(err => next(helper.logError(err, 'createOrder')));
}

exports.getInvoice = (req, res, next) => {
    Order.findById(req.params.id)
        .then(order => {
            if (!order || order.user.userId.toString() !== req.user._id.toString()) {
                return next(helper.logError(`There is no order with orderId:${req.params.id}`, 'getInvoice'));
            }
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline');
            const fileName = `invoice-${req.params.id}.pdf`;
            const path = helper.getPath('data', 'invoices', fileName);
            const pdf = new pdfkit();
            pdf.pipe(fs.createWriteStream(path));
            pdf.pipe(res);

            pdf.fontSize(26).text('Invoice', {
                underline: true
            });
            pdf.text('----------------------------------');

            let totalPrice = 0;
            order.products.forEach(pr => {
                totalPrice += pr.quantity * pr.product.price;
                pdf.fontSize(14).text(`${pr.product.title} - ${pr.quantity}; price: $${pr.product.price}`);
            });
            pdf.text('----------------------------------');
            pdf.fontSize(20).text(`TOTAL PRICE: $${totalPrice}`);
            pdf.end();
            order.invoiceUrl = path;
            order.save();
        })
        .catch(err => next(helper.logError(err, 'getInvoice')));
}
