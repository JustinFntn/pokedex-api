const { getTypesModel, getTypeModel } = require(`./types.model`);

// const getTypesController = (_req, res) => {
//     getTypesModel()
//         .then((types) => {
//             res.status(200).send(types);
//         })
//         .catch((err) => {
//             res.status(500).end(err);
//         });
// };

const getTypesController = async (_req, res) => {
    try {
        const types = await getTypesModel();
        if (types.length === 0) {
            return res.status(204).send(types);
        }
        return res.status(200).send(types);
    } catch (err) {
        return res.status(500).end(err.message);
    }
};

const getTypeController = async (req, res) => {
    try {
        const type = await getTypeModel(req.params.typeId);
        if (type.length === 0) {
            return res.status(204).send(type);
        }
        return res.status(200).send(type);
    } catch (err) {
        return res.status(500).end(err.message);
    }
};

module.exports = { getTypesController, getTypeController };
