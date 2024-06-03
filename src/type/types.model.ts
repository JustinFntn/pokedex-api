import db from "../db";

export interface Type {
    id: number;
    label: string;
}

function getTypesModel(): Promise<Type[]> {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM types`, (err, rows: Type[]) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
}

const getTypeModel = (id: number): Promise<Type | undefined> => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM types WHERE id = ${id}`,
            (err, row: Type | undefined) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            }
        );
    });
};

export { getTypesModel, getTypeModel };
