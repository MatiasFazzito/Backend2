import ProductRepository from "../reporitory/product.repository.js"
import ProductDto from "../dao/DTOs/product.dto.js"

const productService = new ProductRepository()

export const createProduct = async (req, res) => {
    try {
        const productBody = req.body

        await productService.createProduct(productBody)

        res.redirect("/api/products")
    } catch (error) {
        res.render('error', { error: 'Error al crear producto' })
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await productService.getProducts(req)
        const productDtos = products.map(product => new ProductDto(product))

        productDtos.isValid = productDtos.length > 0

        res.render('products', { products: productDtos })

    } catch (error) {
        console.log(error);
        
        res.render('error', { error: 'Error al buscar productos' })
    }
}

export const getProductById = async (req, res) => {
    try {
        const currentUser = req.session.user
        const { pid } = req.params

        const product = await productService.getProductById(pid)
        const productDto = new ProductDto(product)

        currentUser.isValid = currentUser.role == "admin"
        res.render('product', { product: productDto, currentUser })

    } catch (error) {
        res.render('error', { error: 'Error al buscar producto' })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params
        const updates = req.body
        const updateData = { $set: {} }

        for (const key in updates) {
            if (updates.hasOwnProperty(key) && updates[key] !== '') {
                updateData.$set[key] = updates[key]
            }
        }

        await productService.updateProduct(pid, updateData)

        res.redirect("/api/products")
        
    } catch (error) {
        res.render("error", { error: "Error al modificar producto" })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params

        await productService.deleteProduct(pid)

        res.redirect('/api/products')
    } catch (error) {
        res.render('error', { error: 'Error al eliminar producto' })
    }
}

export const addToCart = async (req, res) => {
    try {
        const { pid } = req.params
        const { quantity = 1 } = req.body
        const cartId = req.session.user.cart

        productService.addProductToCart(pid, quantity, cartId)

        res.redirect(`/api/products`)
    } catch (error) {
        res.render("error", { error: 'Error al agregar el producto al carrito' })
    }
}