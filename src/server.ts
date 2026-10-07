import express from "express";
import env from "./config/env-validate.js";

import routes from "./routes/index.js";

import { notFoundHandler } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const port = Number(env.PORT) || 8000;

app.use(express.json());

app.use(routes());

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
