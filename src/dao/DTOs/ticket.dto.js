export default class TicketDto {
    constructor(ticket) {
        this.id = ticket._id
        this.code = ticket.code
        this.purchaseDatetime = ticket.purchaseDatetime
        this.products = ticket.products.map(product => { return { product: product.product.title, quantity: product.quantity } })
        this.amount = ticket.amount
        this.purchaser = ticket.purchaser.email
        this.status = ticket.status
    }
}