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

        const ticket = await ticketService.resolveTicket(tid)
        const resolvedTicket = TicketDto(ticket)

        await transport.sendMail({
            from: "dev testing",
            to: `${resolvedTicket.purchaser}`,
            subject: "Compra confirmada: #" + resolvedTicket.id,
            html: `
            <h1>Ticket ID: ${resolvedTicket.id}</h1>
            <h2>Fecha de compra: ${resolvedTicket.purchaseDatetime}</h2>
            <p>Productos: ${resolvedTicket.products}</p>
            <h2>Total: ${resolvedTicket.amount}</h2>
            `
        })

        res.redirect("/api/tickets") //REVISAR LOGICA DE MAILING

    } catch (error) {
        res.render("error", { error: "Error al resolver ticket" })
    }
}