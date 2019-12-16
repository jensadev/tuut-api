const pool = require('../../config/db');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'insert into tuuts (body, user_id, created_at, updated_at) values (?, ?, ?, ?)',
            [
                data.body,
                data.userId,
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
    getTuuts: callBack => {
        pool.query(
            'select * from tuuts',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getTuutById: (id, callBack) => {
        pool.query(
            'select * from tuuts where id = ?',
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    updateTuut: (data, callBack) => {
        pool.query(
            'update tuuts set body = ?, updated_at = ? where id = ?',
            [
                data.body,
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
    deleteTuut: (data, callBack) => {
        pool.query(
            'delete from tuuts where id = ?',
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    }
}