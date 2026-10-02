const express = require('express')

const testing = (req, res, next) => {

    console.log("holaaa")

    next();

}

module.exports = testing