const {
    create,
    getTuuts,
    getTuutById,
    updateTuut,
    deleteTuut
} = require('./tuut.service');

module.exports = {
    createTuut: (req, res) => {
        const body = req.body;
        body.userId = res.locals.user.id;
        let d = new Date();
        let dateTime = d.toISOString().split('T')[0]+' '+d.toTimeString().split(' ')[0];
        body.created_at = dateTime;
        body.updated_at = dateTime;
        
        create(body, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database error"
                });     
            }
            return res.status(200).json({
                success: 1,
                data: result
            });
        });
    },
    getAllTuuts: (req, res) => {
        getTuuts((err, results) => {
            if (err) {
                console.log(err);
                return;  
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getTuutById: (req, res) => {
        const id = req.params.id;
        getTuutById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;  
            }
            if (!results) {
                return res.status(400).json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });            
        });
    },
    updateTuut: (req, res) => {
        const body = req.body;
        let d = new Date();
        let dateTime = d.toISOString().split('T')[0]+' '+d.toTimeString().split(' ')[0];
        body.updated_at = dateTime;

        updateTuut(body, (err, results) => {
            console.log(results.affectedRows)
            if (err) {
                console.log(err);
                return;  
            }
            if (results.affectedRows != 1) {
                return res.status(400).json({
                    success: 0,
                    message: "Failed to update tuut"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "updated successfully"
            });
        });
    },
    deleteTuut: (req, res) => {
        const data = req.body;
        deleteTuut(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            // if (!results) {
            //     return res.status(400).json({
            //         success: 0,
            //         message: "Record not found"
            //     });
            // }
            return res.status(200).json({
                success: 1,
                message: "tuut deleted successfully"
            });
        });
    },
}
