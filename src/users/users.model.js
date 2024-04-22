const { db } = require(`../db`);

const createUserModel = (newUser) => {
    return new Promise((resolve, reject) => {
        newUser.email = `'${newUser.email}'`;
        newUser.password = `'${newUser.password}'`;

        const keys = Object.keys(newUser);
        const values = Object.values(newUser);

        const sql = `INSERT INTO users (${keys.join(
            ", "
        )}) VALUES (${values.join(", ")})`;

        db.run(sql, (err) => {
            if (err) {
                reject(err);
            }
            resolve("User created");
        });
    });
};

const getUserModel = (email) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE email = '${email}'`, (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });
};

module.exports = { createUserModel, getUserModel };
