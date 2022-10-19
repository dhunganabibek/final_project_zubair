const Ticket = require('../models/ticket');
const tokenService = require('./token');
const jsonWrapper = require('../utils/jsonWrapper')

const saveTicket = async ({ body: data, headers }) => {
    let error = true;
    let message = "Something went wrong";
    let responseData = null;
    try {
        const tokenData = await tokenService.getAuthData(headers['authorization'].split(' ')[1])
        if (tokenData) {
            data.createdBy = tokenData && tokenData.data && tokenData.data._id
            let ticket = new Ticket(data);
            responseData = await ticket.save()
            message = "Ticket created successfully"
            error = false;
        } else {
            message = "You are not autorize to create ticket"
        }
        return jsonWrapper.createJson(responseData, message);
    } catch (err) {
        console.log(err)
        return jsonWrapper.createJson(responseData, message, err);
    }

}
const getAllTickets = async () => {
    let error = true;
    let message = "Something went wrong";
    let responseData = null;
    try {
        responseData = await Ticket.find();
        console.log(responseData)
        message = "";
        error = false;
        return jsonWrapper.createJson(responseData, message);
    } catch (err) {
        console.log(err)
        return jsonWrapper.createJson(responseData, message, err);
    }

}

module.exports = {
    saveTicket, getAllTickets
}