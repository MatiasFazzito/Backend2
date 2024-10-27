import { Router } from 'express'
import ProductModel from "../models/products.model.js"

const router = Router()

router.post('/', async (req, res) => {
    try {
        const newProduct = new ProductModel(req.body)

        await newProduct.save()

        res.redirect("/api/products")

    } catch (error) {
        res.render('error', { error: 'Error al crear producto' })
        console.error(error)
    }
})

router.get('/', async (req, res) => {
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

        products.prevLink = products.hasPrevPage ? `/product?page=${products.prevPage}&sortOrder=${sortOrder}&${category ? `category=${category}` : 'category='}`: ''
        products.nextLink = products.hasNextPage ? `/product?page=${products.nextPage}&sortOrder=${sortOrder}&${category ? `category=${category}` : 'category='}`: ''

        products.isValid = products.docs.length > 0

        res.render('products', { products })

    } catch (error) {
        res.render('error', { error: 'Error al buscar productos' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id)

        if (!product) {
            return res.render('error', { error: 'Producto no encontrado' })
        }

        res.render('product', { product: product.toObject() })

    } catch (error) {
        res.render('error', { error: 'Error al buscar productos' })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body)

        if (!product) {
            return res.render('error', { error: 'Producto no encontrado' })
        }

        res.redirect('/api/product')

    } catch (error) {
        res.render('error', { error: 'Error al buscar productos' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id)

        if (!product) {
            return res.render('error', { error: 'Producto no encontrado' })
        }

        res.redirect('/api/product')

    } catch (error) {
        res.render('error', { error: 'Error al buscar productos' })
    }
})

export default router