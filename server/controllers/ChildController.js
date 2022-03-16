let Child = require('../models/ChildModel');
let { ParentCreate,GetParentById } = require('../services/parent');
let {
    ChildCreate,
    GetChildById
} = require('../services/child.js');
// const AuthService = require('../services/auth');


module.exports = {
    Create: async function (req, res) {
        const {
            name,
            age,
            parent
        } = req.body;

        // validate name and age
        if (!name || !age ) {
            return res.status(403).json({
                success: false,
                message: 'Please provide all the information'
            });
        }

        if (!parent) {
            // create parent
            const parent = await ParentCreate(req.body);
            return res.status(200).json({
                success: true,
                data: await GetParentById(parent._id)
            });
        }

        if (parent) {
            const parentDB = await GetParentById(parent);
            if (!parentDB) {
                return res.status(404).json({
                    success: false,
                    message: 'Parent id is invalid'
                });
            }
        }

        // create child
        try {
            const child = await ChildCreate(req.body);
            return res.status(200).json({
                success: true,
                data: await GetChildById(child._id)
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },
    Edit: async function (req, res) {
        const {
            name,
            age,
            parent,
            id
        } = req.body;

        try {
            if (!name || !age || !parent || !id) {
                return res.status(403).json({
                    success: false,
                    message: 'Please provide all the information'
                });
            }
            let child = await Child.findByIdAndUpdate(id, {name, age, parent}, {new: true});
            return res.status(200).json({
                success: true,
                data: child
            });
        } catch (error) {
            console.log('login : ', error);
            res.status(500).send({
                success: false,
                message: error
            });
        }
    },
    Delete: async function (req, res) {
        const { id } = req.query
        try {
            if (!id) {
                return res.status(403).json({
                    success: false,
                    message: 'Please select record'
                });
            }
            let child = await Child.findByIdAndDelete(id);
            return res.status(200).json({
                success: true,
                data: child
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error
            });
        }
    }
}