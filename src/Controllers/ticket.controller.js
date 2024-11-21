import Ticket from "../dao/mongo/classes/ticket.dao.js"
import Cart from "../dao/mongo/classes/cart.dao.js"
import TicketDto from "../dao/DTOs/ticket.dto.js"
import { transport } from "../utils.js"

const ticketService = new Ticket()
const cartService = new Cart()

export const createTicket = async (req, res) => {
    try {
        const purchaser = req.session.user
        let cart = await cartService.getCartById(req.session.user.cart)
        const products = cart.products
        const amount = cart.amount

        if (!products || products.length === 0) {
            return res.render("error",{ error: 'El carrito está vacío' })
        }

        await ticketService.createTicket(purchaser, products, amount)

        await cartService.deleteCart(req.session.user.cart)

        res.redirect("/checkout")
    } catch (error) {

        res.render("error", { error: "Error al crear ticket de compra" })
    }
}

export const getTickets = async (req, res) => {
    try {
        const tickets = await ticketService.getTickets()
        const ticketDtos = tickets.map(ticket => new TicketDto(ticket))

        res.render("tickets", { tickets: ticketDtos })
    } catch (error) {
        res.render("error", { error: "Error al obtener tickets" })
    }

}

export const getTicketById = async (req, res) => {
    try {
        const currentUser = req.session.user
        const { tid } = req.params

        const ticket = await ticketService.getTicketById(tid)
        const ticketDto = new TicketDto(ticket)        

        if (currentUser.role == "admin" || currentUser.role == "VIP") {
            currentUser.isValid = true
        }

        res.render("ticket", { ticket: ticketDto, currentUser })
    } catch (error) {
        res.render("error", { error: "Error al obtener ticket" })
    }
}

export const resolveTicket = async (req, res) => {
    try {
        const { tid } = req.params

        const resolving = await ticketService.resolveTicket(tid)
        const ticket = await ticketService.getTicketById(resolving)
        const ticketDto = new TicketDto(ticket)

        await transport.sendMail({
            from: "dev testing",
            to: `${ticketDto.purchaser}`,
            subject: "Compra confirmada: #" + ticketDto.id,
            html: `
            <h2>Ticket ID: ${ticketDto.id}</h2>
            <h2>Fecha de compra: ${ticketDto.purchaseDatetime}</h2>
            <p>Productos:</p>
            <ul>
                ${ticketDto.products.map(product => `<li>${product.product} (Cantidad: ${product.quantity})</li>`).join('')}
            </ul>
            <h2>Total: $${ticketDto.amount}</h2>
            `
        })

        res.redirect("/api/tickets")

    } catch (error) {
        
        res.render("error", { error: "Error al resolver ticket" })
    }
}