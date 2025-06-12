import express, { urlencoded } from "express"
import { connectDB } from "./config/config.js"
import cors from "cors"
import router from "./router/router.js";


const app = express();


app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // və ya xüsusi icazələr üçün:
app.use(cors({ origin: "*" }));
app.use("/", router)

connectDB();



app.listen(1500, () => {
    console.log("Server 1500-ci portda işə düşdü");
});
