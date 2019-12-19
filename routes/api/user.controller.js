const {
    create,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByName
} = require('./user.service');

const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        body.password = hashSync(body.password, 10);

        let d = new Date();
        let dateTime = d.toISOString().split('T')[0]+' '+d.toTimeString().split(' ')[0];
        body.created_at = dateTime;
        body.updated_at = dateTime;
        
        if (!body.email.includes("ga.ntig.se")) {
            return res.status(400).json({
                success: 0,
                message: "Invalid email"
            });             
        }

        create(body, (err, result) => {
            if (err) {
                console.log(err);
                if (err.errno == 1062) {
                    return res.status(500).json({
                        success: 0,
                        message: "Duplicate name or email"
                    });                      
                }
                return res.status(500).json({
                    success: 0,
                    message: "Database error"
                });     
            }
            return res.status(201).json({
                success: 1,
                data: result
            });
        });
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;  
            }
            if (!results) {
                return res.status(400).json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });            
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;  
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateUser: (req, res) => {
        const body = req.body;
        body.password = hashSync(body.password, 10);

        let d = new Date();
        let dateTime = d.toISOString().split('T')[0]+' '+d.toTimeString().split(' ')[0];
        body.updated_at = dateTime;

        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;  
            }
            if (results.affectedRows != 1) {
                return res.status(400).json({
                    success: 0,
                    message: "Failed to update user"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "updated successfully"
            });
        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (results.affectedRows != 1) {
                return res.status(404).json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "user deleted successfully"
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByName(body.name, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid name or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, process.env.TOKEN, {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    success: 1,
                    message: "login successfull",
                    userId: results.id,
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Invalid name or password"
                });
            }

        });
    }
}