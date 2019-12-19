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
    getTuuts: (page, total, perPage, callBack) => {
        // console.log(page, total, perPage);
        pool.query(
            'SELECT tuuts.*, users.name FROM tuuts JOIN users ON tuuts.user_id = users.id ORDER BY updated_at DESC LIMIT ? OFFSET ?',
            [perPage, page * perPage],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    countTuuts: callBack => {
        pool.query(
            'SELECT COUNT(id) as totalCount FROM tuuts',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0].totalCount);
            }
        )
    },
    getTuutById: (id, callBack) => {
        pool.query(
            'select tuuts.*, users.name from tuuts join users on tuuts.user_id = users.id where id = ?',
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