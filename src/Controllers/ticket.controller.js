import Ticket from "../dao/mongo/classes/ticket.dao.js"
import Cart from "../dao/mongo/classes/cart.dao.js"
import TicketDto from "../dao/DTOs/ticket.dto.js"

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

        await ticketService.resolveTicket(tid)

        res.redirect("/api/tickets") //APLICAR LOGICA DE MAILING

    } catch (error) {
        res.render("error", { error: "Error al resolver ticket" })
    }
}