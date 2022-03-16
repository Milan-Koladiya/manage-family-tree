let Parent = require('../models/ParentModel');
let { ParentCreate, GetParentById, GetAllParent } = require('../services/parent');

module.exports = {
    get: async function (req, res) {
        try {
            const result = await Parent.find();
            const allParentWithChild = await GetAllParent(result);
            const parentWithChild = result.map((parent, index) => {
                return {parent, child: allParentWithChild[index].child}
            })
                return res.status(200).json({
                    success: true,
                    data: parentWithChild,
                });
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: err
            });
        }
    },
    Create: async function (req, res) {
        const {
            name,
            age
        } = req.body;

        if (!name || !age) {
            return res.status(403).json({
                success: false,
                error: 'Please provide all the information'
            });
        }

        // create parent
        try {
            const user = await ParentCreate(req.body);
            return res.status(200).json({
                success: true,
                data: await GetParentById(user._id)
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }
    }
}