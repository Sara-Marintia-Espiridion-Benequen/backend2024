const {request, response} = require('express');

const getMessage = (req = request, res = response) => {
    res.send('Hello world the users controiler!')
}

module.exports = {getMessage};