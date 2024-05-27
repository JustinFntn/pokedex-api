const { getTypesModel, getTypeModel } = require(`./types.model`);

const getTypesController = async (req, res) => {
    try {
        const types = await getTypesModel();
        if (types.length === 0) {
            return res.status(204).end();
        }
        return res.status(200).send(types);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getTypeController = async (req, res) => {
    try {
        const type = await getTypeModel(req.params.typeId);
        if (type.length === 0) {
            return res.status(204).end();
        }
        return res.status(200).send(type);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getTypesController, getTypeController };
