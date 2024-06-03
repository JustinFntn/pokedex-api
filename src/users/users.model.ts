import db from "../db";

export interface User {
    email: string;
    password: string;
}

const createUserModel = (newUser: User): Promise<string> => {
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

const getUserModel = (email: string): Promise<User | undefined> => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM users WHERE email = '${email}'`,
            (err, row: User | undefined) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            }
        );
    });
};

export { createUserModel, getUserModel };
