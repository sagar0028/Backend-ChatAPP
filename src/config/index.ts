import * as dotenv from "dotenv";
import path from "path";
dotenv.config();
const PROJECT_ROOT = path.join(__dirname, "../..");

export default  {
    MONGODB_URI: process.env.MONGO_URI || "",
}