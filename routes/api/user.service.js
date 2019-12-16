const pool = require('../../config/db');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'insert into users (name, email, password, created_at, updated_at) values (?, ?, ?, ?, ?)',
            [
                data.name,
                data.email,
                data.password,
                data.created_at,
                data.updated_at
            ],
            (error, results, field) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }       
        );
    },
    getUsers: callBack => {
        pool.query(
            'select * from users',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getUserById: (id, callBack) => {
        pool.query(
            'select * from users where id = ?',
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    updateUser: (data, callBack) => {
        pool.query(
            'update users set name = ?, email = ?, password = ?, updated_at = ? where id = ?',
            [
                data.name,
                data.email,
                data.password,
                data.updated_at,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deleteUser: (data, callBack) => {
        pool.query(
            'delete from users where id = ?',
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    getUserByName: (name, callBack) => {
        pool.query(
            'select * from users where name = ?',
            [name],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    }
}