const emailValidator = [
    function ValidateEmail(email) 
    {
        return !email || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    },
    'Please supply valid {PATH}'
]
module.exports = { emailValidator }