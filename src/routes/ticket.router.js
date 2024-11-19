import { Router } from "express"
import { getTickets, getTicketById, resolveTicket } from "../Controllers/ticket.controller.js"
import { handlePolicies, passportCall } from "../utils.js"

const router = Router()

router.get("/", passportCall("jwt"), handlePolicies(["VIP", "admin"]), getTickets)

router.get("/:tid", passportCall("jwt"), handlePolicies(["user", "VIP", "admin"]), getTicketById)

router.put("/:tid/resolve", passportCall("jwt"), handlePolicies(["VIP", "admin"]), resolveTicket)

export default router