const bcrypt = require('bcryptjs');
const generator = require('generate-password');

const User = require('../models/user');
const tokenService = require('./token');
const jsonWrapper = require('../utils/jsonWrapper')
const { USER_TYPE, USERS } = require('../constants/db/users')
const { SUPER_ADMIN, TICKET_MANAGER, ADMIN, CUSTOMER } = USERS

const isAuthorizeUpdateUser = async (headers, userType = CUSTOMER) => {
    let isAuthorized = false;
    const tokenData = await tokenService.getAuthData(headers['authorization'].split(' ')[1])
    const tokenDataUserType = tokenData && tokenData.data && tokenData.data.userType;
    isAuthorized = tokenData && (USER_TYPE[tokenDataUserType].USER_RIGHTS).includes(userType);
    return isAuthorized;
}
const isPasswordUser = (userType = CUSTOMER) => (userType === ADMIN || userType === SUPER_ADMIN || userType === TICKET_MANAGER)

const saveUser = async ({ body: data, headers }) => {
    let error = true;
    let message = "Something went wrong";
    let responseData = null;
    try {
        const isAuthoriseToCreateUser = await isAuthorizeUpdateUser(headers, data.userType)
        const user = data.contact && await User.findOne({ contact: data.contact });
        if (user && !user.status) {
            message = "There is some problem with this user. Please contact admin"
        } else if (user) {
            message = "There is already an active user found with this contact number"
        } else if (!isAuthoriseToCreateUser) {
            message = "You are not authorise to create this user";
        } else if (isPasswordUser(data.userType)) {
            const password = generator.generate({ length: 5, numbers: true })
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash("password", salt);
            data.password = hash;
            error = false;
        } else if (!isPasswordUser()) {
            data.userType = CUSTOMER;
            error = false;
        } else {
            message = "User can not be created because data is not valid";
        }
        if (!error) {
            let user = new User(data);
            responseData = await user.save()
            message = "User added successfully"
        }
        return jsonWrapper.createJson(responseData, message);
    } catch (err) {
        console.log(err)
        return jsonWrapper.createJson(responseData, message, err);
    }
}
const getUser = async ({ headers }) => {
    try {
        let user = await tokenService.getAuthData(headers['authorization'].split(' ')[1])
        return jsonWrapper.createSuccessJson(user.data);
    } catch (err) {
        return jsonWrapper.createErrorJson(err);
    }

}
const deleteUser = async (req) => {
    let error = true;
    let message = "Something went wrong";
    let responseData = null;
    try {
        const userId = req.params.id;
        const headers = req.headers;
        let user = await User.findById(userId);
        const isAuthoriseToDeleteUser = await isAuthorizeUpdateUser(headers, user.userType)
        if (!user || !user.status) {
            message = "User not found in active directory";
        } else if (!isAuthoriseToDeleteUser) {
            message = "You are not authorise to delete this user";
        } else {
            error = false;
        }
        if (!error) {
            user.status = false;
            responseData = await User.findByIdAndUpdate(userId, user, { new: true });
            message = "User deleted successfully"
        }
        return jsonWrapper.createJson(responseData, message);
    } catch (err) {
        console.log(err)
        return jsonWrapper.createJson(responseData, message, err);
    }

}
const updateUser = async (req) => {
    let error = true;
    let message = "Something went wrong";
    let responseData = null;
    try {
        const userId = req.params.id;
        const headers = req.headers;
        let user = await User.findById(userId);
        const isAuthoriseToUpdateUser = await isAuthorizeUpdateUser(headers, user.userType)
        if (!user) {
            message = "User is not found"
        } else if (user && !user.status) {
            message = "There is some problem with this user. Please contact admin"
        } else if (!isAuthoriseToUpdateUser) {
            message = "You are not authorise to updated this user";
        } else {
            error = false;
        }
        if (!error) {
            responseData = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            message = "User updated Successfully"
        }
        return jsonWrapper.createJson(responseData, message);
    } catch (err) {
        return jsonWrapper.createJson(responseData, message, err);
    }
}
const authenticateUser = async (data) => {
    let error = true;
    let message = "Something went wrong";
    let responseData = null;
    let err = null;
    try {
        const user = await User.findOne({ contact: data.contact });
        if (user && (isPasswordUser(user.userType) || data.isEmployee)) {
            let isMatch = data.password && await bcrypt.compare(data.password, user.password);
            if (isMatch) {
                let token = await tokenService.getToken(user);
                let { userType, name, password } = user;
                responseData = { token, userType, password, name };
                error = false;
            } else {
                responseData = { error: true, incorrectPassword: true }
                message = "Password is not correct"
            }
        } else if (user && !isPasswordUser()) {
            let token = await tokenService.getToken(user);
            responseData = { token }
            error = false;
            message = "User found in database";
        } else if (user && !user.status) {
            message = "There is some problem with this user. Please contact admin";
        } else if (!user) {
            message = "User Not found";
            responseData = { error: true, userNotFound: true }
        }
        return jsonWrapper.createJson(responseData, message, err);
    } catch (err) {
        console.log(err)
        return jsonWrapper.createJson(responseData, message, err);
    }
}
const verifyOtp = async (data) => {
    let error = true;
    let message = "Something went wrong";
    let responseData = null;
    try {
        if (data.contact && data.otp === "1234") {
            const newUser = new User({ contact: data.contact, userType: CUSTOMER });
            const savedUser = await newUser.save()
            const token = await tokenService.getToken(savedUser);
            responseData = { token }
            error = false;
            message = "New user created";
        } else {
            responseData = { error: true, incorrectOtp: true };
            message = "Otp is not correct"
        }
        return jsonWrapper.createJson(responseData, message);
    } catch (err) {
        console.log(err)
        return jsonWrapper.createJson(responseData, message, err);
    }
}
const getAllUsers = async () => {
    return await User.find();
}
const getContacts = async () => {
    try {
        let users = await User.find({ userType: 4, status: true }, 'contact _id');
        return jsonWrapper.createSuccessJson(users);
    } catch (err) {
        return jsonWrapper.createErrorJson(err);
    }
}
const getUserById = async (req) => {
    let error = true;
    let message = "Something went wrong";
    let responseData = null;
    try {
        const userId = req.params.id;
        const headers = req.headers;
        let user = await User.findById(userId);
        const isAuthoriseToViewUser = await isAuthorizeUpdateUser(headers, user.userType)
        if (!user || !user.status) {
            message = "User is not found in active directory";
        } else if (!isAuthoriseToViewUser) {
            message = "You are not authorise to view this user";
        } else {
            responseData = user
            error = false;
            message = "User found"
        }
        return jsonWrapper.createJson(responseData, message);
    } catch (err) {
        return jsonWrapper.createJson(responseData, message, err);
    }
}
module.exports = {
    saveUser, authenticateUser, getUser, getAllUsers, deleteUser,
    updateUser, getContacts, getUserById, verifyOtp
}