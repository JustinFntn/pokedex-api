import db from "src/db";

const getTypesModel = (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM types`, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

const getTypeModel = (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM types WHERE id = ${id}`, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

export { getTypesModel, getTypeModel };
