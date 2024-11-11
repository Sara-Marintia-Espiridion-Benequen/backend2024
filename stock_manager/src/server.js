const express = require('express');
const staffRoutes = require('./routes/staff');

class Server {
    constructor() {
        this.app = express();
        this.port = 3000;
        this.app.use(express.json());

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/staff', staffRoutes);
    }

    start() {
        this.app.listen(this.port, () => {
            console.log('Server listening on port ' + this.port);
        });
    }
}

module.exports = { Server };
