const EmployeeModel = require("../models/employeeModel")

const createEmployee = async (req, res) => {
    try{
        const {name, email, role} = req.body

        if(!name && !email && !role){
            return res.status(400).json({
                success: false,
            message: "Name, email and role all are required"
            })
        }

        const employeeName = name.trim()
        const nameExist = await EmployeeModel.findOne({name: employeeName})

        if(nameExist){
           return res.status(409).json({
                success: false,
            message: `Employee name already exist`
            })
        }

        const emailExist = await EmployeeModel.findOne({email: email})

        if(emailExist){
            return res.status(409).json({
                success: false,
            message: `Employee email already exist`
            })
        }

        const newEmployee = await EmployeeModel.create({
            name: employeeName,
            email,
            role,
        })

         return res.status(201).json({
                success: true,
            message: `Employee created successfully`,
            data: newEmployee,
            })

    }catch(error){
        return res.status(500).json({
            success:false,
            message: `Employee creation failed due to ${error.message}`
        })
    }

}


const updateEmployeeById = async (req, res) => {
    try {
        const { _id } = req.params;
        const { name, email, role } = req.body;

        const employeeExist = await EmployeeModel.findById(_id);

        if (!employeeExist) {
            return res.status(404).json({
                success: false,
                message: "Employee doesn't exist with this id"
            });
        }

        const updates = {};

        if (name !== undefined) {
            if (typeof name !== "string" || !name.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Employee name must be a non-empty string"
                });
            }

            updates.name = name.trim();
        }

        if (email !== undefined) {
            if (typeof email !== "string" || !email.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Employee email must be a non-empty string"
                });
            }

            updates.email = email.trim().toLowerCase();
        }

        if (role !== undefined) {
            updates.role = role;
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Provide at least one field to update"
            });
        }

        if (updates.name !== undefined) {
            const nameExist = await EmployeeModel.findOne({
                name: updates.name,
                _id: { $ne: _id }
            });

            if (nameExist) {
                return res.status(409).json({
                    success: false,
                    message: "Employee name already exists"
                });
            }
        }

        if (updates.email !== undefined) {
            const emailExist = await EmployeeModel.findOne({
                email: updates.email,
                _id: { $ne: _id }
            });

            if (emailExist) {
                return res.status(409).json({
                    success: false,
                    message: "Employee email already exists"
                });
            }
        }

        const updatedEmployee =
            await EmployeeModel.findByIdAndUpdate(
                _id,
                { $set: updates },
                { new: true, runValidators: true }
            );

        return res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            data: updatedEmployee
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Employee updation failed due to ${error.message}`
        });
    }
};


const getEmployeeById = async (req, res) => {
    try{

        const _id = req.params._id;
        const employee = await EmployeeModel.findById(_id);

        if(!employee){
            return res.status(404).json({
                success: false,
                message: "No employee found with given id"
            })
        }

        return res.status(200).json({
                success: true,
                message: "Employee fetched successfully",
                data: employee
            })

    }catch(error){
        res.status(500).json({
            success:false,
            message: `Failed to fetch employee due to ${error.message}`
        })
    }

}

const getAllEmployees = async (req, res) => {
    try{

        const employees = await EmployeeModel.find();

        if(employees.length === 0){
            return res.status(404).json({
                success: false,
                message: "No employees found"
            })
        }

        return res.status(200).json({
                success: true,
                message: "Employees fetched successfully",
                data: employees
            })

    }catch(error){
        res.status(500).json({
            success:false,
            message: `Failed to fetch employees due to ${error.message}`
        })
    }

}

const deleteEmployeeById = async (req, res) => {
    try{

        const _id = req.params._id;

        const employee = await EmployeeModel.findOneAndDelete(_id)

        if(!employee){
            return res.status(404).json({
                success: false,
                message: "No employee found with given id"
            })
        }

        return res.status(200).json({
                success: true,
                message: "Employee deleted successfully",
                data: employee
            })

    }catch(error){
        res.status(500).json({
            success:false,
            message: `Employee deletion failed due to ${error.message}`
        })
    }

}

module.exports = {
    createEmployee, updateEmployeeById, getAllEmployees, getEmployeeById, deleteEmployeeById
} 