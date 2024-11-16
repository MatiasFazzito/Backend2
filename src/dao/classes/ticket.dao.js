import TicketsModel from "../models/ticket.model.js";

export default class Ticket {

    getTickets = async () => {
        try {
            const result = await TicketsModel.find()

            return result
        } catch (error) {

            return null
        }
    }

    getTicketById = async (id) => {
        try {
            const result = await TicketsModel.findOne({ _id: id })
            
            return result
        } catch (error) {

            return null
        }
    }

    createTicket = async (ticket) => {
        try {
            const result = await TicketsModel.create(ticket)

            return result
        } catch (error) {

            return null
        }
    }

    resolveTicket = async (id, ticket) => {
        try {
            const result = await TicketsModel.updateOne({ _id: id }, { $set: ticket })

            return result
        } catch (error) {
            return null
        }
    }
}