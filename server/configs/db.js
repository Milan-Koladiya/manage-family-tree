const mongoose = require("mongoose");
const { config } = require("./index");

exports.connect = () => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    mongoose.connect(
        `${config.MONGO_URI}`,
        options,
        err => {
            if (err) {
                console.log("DB Connection ERROR => ", err);
            }
        }
    );

    const db = mongoose.connection;


    db.on("connected", () => {
        console.log("Database connected to the successfully!");
    });
    db.on("disconnected", () => {
        console.log("Database Disconnected");
    });
    db.on("error", err => {
        console.log("Database connection error : ", err);
    });

    process.on("SIGINT", () => {
        db.close(() => {
            console.log(
                "Mongoose default connection is disconnected due to application termination"
            );
            process.exit(0);
        });
    });
}


