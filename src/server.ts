import app from "./app/app";
import config from "./config";
import { initDB } from "./db";


const main = () => {
  initDB();
  // here the server is started
  app.listen(config.port, () => {
    console.log(`the server is running on port ${config.port}`);
  });
};
main()