import express from "express";
import { userRouter } from "./routes/user.js";
import cors from "cors";
import { adminRouter } from "./routes/admin.js";
import { courseRouter } from "./routes/courses.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/courses", courseRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
