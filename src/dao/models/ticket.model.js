import mongoose from "mongoose"

const ticketSchema = new mongoose.Schema({
    code: { type: String },
    purchaseDatetime: new Date().toLocaleTimeString(),
    amount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    purchaser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
})

const TicketModel = mongoose.model("tickets", ticketSchema)

export default TicketModel