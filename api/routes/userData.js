const express = require('express')
const router = express.Router()

router.post('/', (req, res, next) => {
    console.log(req.body)
    const name = req.body.name
    let rate = req.body.rate
    const timesheet = req.body.timesheet
    if (!name || !rate || !timesheet) {
        return res.status(500).json({
            message: "Invalid request"
        })
    } else if (isNaN(rate)) {
        return res.status(201).json({
            message: "Invalid hourly rate"
        })
    }
    if (rate > 50) {
        return res.status(201).json({
            message: "hourly rate cant exceed $50"
        })
    } else if (rate <= 0) {
        return res.status(201).json({
            message: "hourly rate cant be 0 or less than 0"
        })
    }
    rate = parseInt(rate)

    let totalHours = 0
    let totalCost = 0
    try {
        Object.keys(timesheet).forEach(function (element, key, _array) {
            if (timesheet[element] > 0 && !isNaN(timesheet[element])) {
                if (element == "saturday") {
                    totalCost += timesheet[element] * (rate + rate * 1.5 / 100)
                } else if (element == "sunday") {
                    totalCost += timesheet[element] * (rate + rate * 2 / 100)
                } else {
                    totalCost += timesheet[element] * rate
                }
                totalHours += parseFloat(timesheet[element])
            }
        })
    } catch (e) {
        console.log("eeeee", e)
    }

    let returnObj = {
        "name": name,
        "Hourly cost": rate,
        "total hours": totalHours,
        "total cost": totalCost
    }
    console.log("asdasd", returnObj)
    res.status(201).json(returnObj)
})

module.exports = router
