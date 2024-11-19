import Ticket from "../dao/classes/ticket.dao.js"
import Cart from "../dao/classes/cart.dao.js";

const ticketService = new Ticket()
const cartService = new Cart()

export const createTicket = async (req, res) => {
    try {
        const purchaser = req.session.user
        let cart = await cartService.getCartById(req.session.user.cart)
        const products = cart.products
        const amount = cart.amount

        await ticketService.createTicket(purchaser, products, amount )

        await cartService.deleteCart(req.session.user.cart)

        res.redirect("/home")
    } catch (error) {

        res.render("error", { error: "Error al crear ticket de compra" })
    }
}

export const getTickets = async (req, res) => {
    try {
        const tickets = await ticketService.getTickets()

        res.render("tickets", { tickets })
    } catch (error) {
        res.render("error", { error: "Error al obtener tickets" })
    }

}

export const getTicketById = async (req, res) => {
    try {
        const currentUser = req.session.user
        const { tid } = req.params

        const ticket = await ticketService.getTicketById(tid)

        currentUser.isValid = currentUser.role == "admin"

        res.render("ticket", { ticket: ticket.toObject(), currentUser })
    } catch (error) {
        res.render("error", { error: "Error al obtener ticket" })
    }
}

export const resolveTicket = async (req, res) => {
    try {
        const currentUser = req.session.user
        const { tid } = req.params

        const ticket = await ticketService.resolveTicket(tid)

        res.render("tickets") //PROBAR SI FUNCIONA
        
    } catch (error) {
        res.render("error", { error: "Error al resolver ticket" })
    }
}