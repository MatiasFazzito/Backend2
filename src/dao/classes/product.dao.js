import ProductModel from "../models/product.model.js"
import CartModel from "../models/cart.model.js"

export default class Product {
    getProducts = async () => {
        try {
            const page = parseInt(req.query.page) || 1
            const rows = parseInt(req.query.rows) || 5
            const category = req.query.category
            const sortField = req.query.sortField || 'price'
            const sortOrder = req.query.sortOrder || 'asc'

            const options = {
                page,
                limit: rows,
                sort: { [sortField]: sortOrder === 'asc' ? 1 : -1 },
                filter: category ? { category } : {},
                lean: true
            }

            const products = await ProductModel.paginate(category ? { category } : {}, options)

            products.prevLink = products.hasPrevPage ? `/api/products?page=${products.prevPage}&sortOrder=${sortOrder}&${category ? `category=${category}` : 'category='}` : ''
            products.nextLink = products.hasNextPage ? `/api/products?page=${products.nextPage}&sortOrder=${sortOrder}&${category ? `category=${category}` : 'category='}` : ''

            products.isValid = products.docs.length > 0

            return products
        } catch (error) {
            return null
        }
    }

    getProductById = async (id) => {
        try {
            const product = await ProductModel.findOne({ _id: id })

            if (!product) {
                return res.render('error', { error: 'Producto no encontrado' })
            }

            return product

        } catch (error) {
            return null
        }
    }

    /*updateProduct = async (id, user) => {
        try {
            
        } catch (error) {
            return null
        }
    }*/

    deleteProduct = async (id) => {
        try {
            const product = await ProductModel.deleteOne({ _id: id })

            if (!product) {
                return res.render('error', { error: 'Producto no encontrado' })
            }
        } catch (error) {
            return null
        }
    }

    addProductToCart = async (id) => {
        try {
            const { quantity = 1 } = req.body
            const cartId = req.session.user.cart

            const product = await ProductModel.findOne({ _id: id })
            const cart = await CartModel.findById(cartId)

            const productIndex = cart.products.findIndex(item => item.product.toString() === product._id.toString())

            if (productIndex !== -1) {
                cart.products[productIndex].quantity = Number(cart.products[productIndex].quantity) + Number(quantity)
            } else {
                cart.products.push({ product: product._id, quantity })
            }

            await cart.save()
        } catch (error) {
            return null
        }
    }
}