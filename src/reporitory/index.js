import User from "../dao/mongo/classes/user.dao.js"
import Ticket from "../dao/mongo/classes/ticket.dao.js"
import Product from "../dao/mongo/classes/product.dao.js"
import Cart from "../dao/mongo/classes/cart.dao.js"
import UserRepository from "./users.repository.js"
import TicketRepository from "./ticket.repository.js"
import ProductRepository from "./product.repository.js"
import CartRepository from "./cart.repository.js"

export const usersService = new UserRepository(new User())
export const ticketService = new TicketRepository(new Ticket())
export const productService = new ProductRepository(new Product())
export const cartService = new CartRepository(new Cart())