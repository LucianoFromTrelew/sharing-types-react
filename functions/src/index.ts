import * as functions from "firebase-functions";

const app = require(`${process.cwd()}/dist`).createConfiguredServer();
console.log("*** *********** ***");
console.log("*** REQUIRED APP ***");
console.log("*** *********** ***");
export const backend = functions.https.onRequest(app);
