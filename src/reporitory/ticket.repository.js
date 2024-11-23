import { DateTime } from "luxon"
import TicketsModel from "../dao/mongo/models/ticket.model.js"


export default class TicketRepository {
    createTicket = async (purchaser, products, amount) => {
        try {

            const newTicket = { purchaser, products, amount }

            const result = await TicketsModel.create(newTicket)

            return result
        } catch (error) {

            return null
        }
    }

    getTickets = async () => {
        try {
            const result = await TicketsModel.find().populate("products.product").populate("purchaser").lean()

            result.forEach(ticket => {
                ticket.purchaseDatetime = DateTime.fromISO(ticket.purchaseDatetime).setLocale("es").toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)
            })

            return result
        } catch (error) {

            return null
        }
    }

    getTicketById = async (id) => {
        try {
            const result = await TicketsModel.findOne({ _id: id }).populate("products.product").populate('purchaser')

            result.purchaseDatetime = DateTime.fromISO(result.purchaseDatetime).setLocale("es").toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)

            return result
        } catch (error) {
            return null
        }
    }

    resolveTicket = async (id) => {
        try {
            const result = await TicketsModel.findOneAndUpdate({ _id: id }, { $set: { status: "resolved" } })

            return result
        } catch (error) {
            return null
        }
    }
}