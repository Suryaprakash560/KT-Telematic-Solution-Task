const express = require('express');
const router = express.Router()

const Employees = require('../models/employee')

// get all
router.get('/ALL',async (req,res) => {
    try {
        const allEmployees = await Employees.find()
        res.json(allEmployees);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// get one
router.get('/:id',getEmployees,(req,res) => {
    res.json(res.employee);
})

// create one
router.post('/',async (req,res) => {
    console.log(req.body);
    const newEmployeeJSON = new Employees({
        empId: req.body.empId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNo: req.body.phoneNo
    })
    try {
        const newEmployee = await newEmployeeJSON.save()
        res.status(201).json(newEmployee)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// update one
router.patch('/:id',getEmployees, async (req,res) => {
    try {
        if (req.body.empId != null) {
            res.employee.empId = req.body.empId
        }
        if (req.body.firstName != null) {
            res.employee.firstName = req.body.firstName
        }
        if (req.body.lastName != null) {
            res.employee.lastName = req.body.lastName
        }
        if (req.body.email != null) {
            res.employee.email = req.body.email
        }
        if (req.body.phoneNo != null) {
            res.employee.phoneNo = req.body.phoneNo
        }
        const updateEmployee = await res.employee.save()
        res.json(updateEmployee)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})

// delete one
router.delete('/:id',getEmployees, async(req,res) => {
    try {
        await res.employee.remove()
        res.json({ message: "Employee deleted"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// check user at DB
async function getEmployees(req,res,next) {
    let employee
    try {
        employee = await Employees.findById(req.params.id)
        if (employee == null) {
            return res.status(404).json({ message: 'Cannot find employee'})
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.employee = employee
    next();
}

module.exports = router;