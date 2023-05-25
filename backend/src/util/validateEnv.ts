import { cleanEnv } from "envalid";
import { port, str, num } from "envalid/dist/validators";

export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
    SESSION_SECRET: str(),
    HASH_LENGTH: num(),

})