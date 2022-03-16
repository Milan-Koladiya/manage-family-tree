const Parent = require('../models/ParentModel');
const Child = require('../models/ChildModel');

module.exports.GetAllParent = async function (result) {
    if (result) {
        const getChild = result.map(async (parent) => {
                const child = await Child.find({parent: parent._id});
                return { child }
            })
        return Promise.all(getChild);
    }
    return null;
}


module.exports.ParentCreate = async function (req) {
    const {
        name,
        age
    } = req;
    let parent =await new Parent();
    parent.name = name;
    parent.age = age;
    const result = await parent.save();
    if (result) {
        return result;
    }
    return result;
}

module.exports.GetParentById = async function (id) {
    const result = await Parent
        .findById({
            _id: id
        });
    if (result) {
        return result;
    }
    return null;
}