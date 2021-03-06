const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const routes = require('../config')?.routes;
const protectRoutes = require('../middleware/protect-routes');
const helper = require('../util/helper');

router.get(routes.ADMIN_ADD_PRODUCT, protectRoutes, adminController.getCreateProductForm);

router.post(
    routes.ADMIN_ADD_PRODUCT,
    protectRoutes,
    [
        body('title').isLength({ min: 3 }).withMessage('Length of Title should be at least 3 characters.').trim(),
        body('description', 'Description should not be more than 500 characters.').isLength({ max: 500 }).trim(),
        body('price', 'Price input is not valid.').isFloat(),
        body('image')
            .isEmpty()
            .custom((value, { req }) => {
                const isValid = helper.isImage(req?.file?.mimetype);
                if (!isValid) {
                    return Promise.reject('Invalid image format.');
                }
                return true;
            })
    ],
    adminController.createProduct
);

router.get(routes.ADMIN_EDIT_PRODUCT_ID, protectRoutes, adminController.editProduct);

router.post(
    routes.ADMIN_EDIT_PRODUCT,
    [
        body('title').isLength({ min: 3 }).withMessage('Length of Title should be at least 3 characters.').trim(),
        body('description', 'Description should not be more than 500 characters.').isLength({ max: 500 }).trim(),
        body('price', 'Price input is not valid.').isFloat(),
        body('image').custom((value, { req }) => {
            if (!req?.file) {
                //For edit mode upload image is not required
                return true;
            }
            const isValid = helper.isImage(req.file?.mimetype);
            if (!isValid) {
                return Promise.reject('Invalid image format.');
            }
            return true;
        })
    ],
    protectRoutes,
    adminController.updateProduct
);

router.get(routes.ADMIN_PRODUCTS, protectRoutes, adminController.getProducts);

router.get(routes.ADMIN_DELETE_PRODUCT_ID, protectRoutes, adminController.deleteProduct);

module.exports = router;