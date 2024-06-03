import { Type, getTypesModel, getTypeModel } from "./types.model";

const getTypesController = async (req: any, res: any) => {
    try {
        const types: Type[] = await getTypesModel();
        if (types.length === 0) {
            return res.status(204).end();
        }
        return res.status(200).send(types);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getTypeController = async (req: any, res: any) => {
    try {
        const type: Type | undefined = await getTypeModel(req.params.typeId);
        if (type === undefined) {
            return res.status(204).end();
        }
        return res.status(200).send(type);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export { getTypesController, getTypeController };
