import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/sup', (request, reply) => {

    const {marca, produto, quant, valor, dosediaria} = request.body

    database.create({
        marca: marca,
        produto: produto,
        quant: quant,
        valor: valor,
        dosediaria: dosediaria,
    })

    return reply.status(201).send
})

server.get('/sup', (request) => {
    const search = request.query.search
    console.log(search)
    const sups = database.list(search)
    console.log(sups)
    return sups
})

server.put('/sups/:id', (request, reply) => {
    const supId = request.params.id
    const {marca, produto, quant, valor, dosediaria} = request.body
    const sup = database.update(supId, {
        marca: marca,
        produto: produto,
        quant: quant,
        valor: valor,
        dosediaria: dosediaria,
    })
    return reply.status(204).send()
})

server.delete('/sups/:id', (request, reply) => {
    const supId = request.params.id

    database.delete(supId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})