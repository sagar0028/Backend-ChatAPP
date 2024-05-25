import { connect } from "mongoose";
import config from "../config";
// import logger from "../helpers/utils/logger";

class Mongo {
    private _connectionString: string;
    constructor(connectionString: any) {
        this._connectionString = connectionString;
    }

    connectDB = async () => {
        try {
            await connect(this._connectionString);
            console.log("Connected to Mongo database...");
        } catch (error) {
            console.error(error);
        }
    };
}

export default new Mongo(config.MONGODB_URI);