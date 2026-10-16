const {createEmployee, getAllEmployees, deleteEmployeeById, getEmployeeById, updateEmployeeById} = require("../controllers/employeeController")
const express = require("express")
const router = express.Router()

router.post("/", createEmployee);
router.get("/", getAllEmployees)
router.get("/:_id", getEmployeeById)
router.patch("/:_id", updateEmployeeById)
router.delete("/:_id", deleteEmployeeById)

module.exports = router