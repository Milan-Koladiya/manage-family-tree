const Child = require('../models/ChildModel');

module.exports.ChildCreate = async function (req) {
    const {
        name,
        age,
        parent
    } = req;
    let child =await new Child();
    child.name = name;
    child.age = age;
    child.parent = parent;
    const result = await child.save();
    if (result) {
        return result;
    }
    return result;
}

module.exports.GetChildById = async function (id) {
    const result = await Child
        .findById({
            _id: id
        });
    if (result) {
        return result;
    }
    return null;
}