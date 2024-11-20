import { DateTime } from "luxon"
import mongoose from "mongoose"

const ticketSchema = new mongoose.Schema({
    code: { type: Number, unique: true },
    purchaseDatetime: { type: String, default: () => DateTime.now().toISO() }, 
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: Number
            }
        ]
    },
    amount: { type: Number },
    purchaser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    status: {type: String, default: "pending"}
})

ticketSchema.pre('save', async function (next) {
    // Lógica para generar el código
    const lastTicket = await TicketModel.findOne().sort({ code: -1 })
    this.code = lastTicket ? lastTicket.code + 1 : 1
    next()
})

const TicketModel = mongoose.model("tickets", ticketSchema)

export default TicketModel