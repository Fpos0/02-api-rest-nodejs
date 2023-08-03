import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { transactionsRoutes } from './routes/transactions'

export const app = fastify()

// This is a plugin, usiong this you a function on another file without the need to import the daatabase itself,smthing like this
app.register(cookie)
app.register(transactionsRoutes, {
  prefix: 'transactions',
})
