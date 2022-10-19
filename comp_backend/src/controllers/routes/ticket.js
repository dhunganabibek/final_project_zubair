const ticketService = require('../../services/ticket')
module.exports = function (router) {
    router.post('/ticket', (req, res) => {
        ticketService.saveTicket(req).then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(400).json(err);
        })
    })
    router.get('/ticket1', (req, res) => {
        ticketService.getAllTickets(req).then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(400).json(err);
        })
    })

    router.get('/ticket', (req, res) => {
        ticketService.getAllTickets(req).then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(400).json(err);
        })
    })
}