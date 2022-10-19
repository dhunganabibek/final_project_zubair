const moment = require("moment")

module.exports.sortData = (data = [], property, type) => {
    if(type === 'date'){
        return data.sort((a,b) => {
            return moment(a[property]).isBefore(b[property]) ? 1 : -1;
        })
    }
}