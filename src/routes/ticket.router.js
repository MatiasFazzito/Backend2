import { Router } from "express"
import { getTickets, getTicketById, resolveTicket } from "../Controllers/ticket.controller.js"
import { handlePolicies, passportCall } from "../utils.js"

const router = Router()

router.get("/", passportCall("current"), handlePolicies(["VIP", "admin"]), getTickets)

router.get("/:tid", passportCall("current"), handlePolicies(["user", "VIP", "admin"]), getTicketById)

router.put("/:tid/resolve", passportCall("current"), handlePolicies(["VIP", "admin"]), resolveTicket)

export default router