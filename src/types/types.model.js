const { db } = require(`../db`);

const getTypesModel = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM types`, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

const getTypeModel = (id) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM types WHERE id = ${id}`, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

module.exports = { getTypesModel, getTypeModel };
