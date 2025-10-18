import mongoose from "mongoose";
import { app } from "./app";
import { Server } from "http";
import { envVars } from "./app/Config/env";




 
let server: Server;


const main = async () => {

    try {
        await mongoose.connect(envVars.DB_URL);
         
        server = app.listen(envVars.PORT, () => {
            console.log("server is running",envVars.PORT);
        })
    } catch (error) {
        console.log(error);
    }



}

main();


/// global error

process.on('SIGTERM', () => {

   console.log("SIGTERM rejecktion detected... server shutdown");

   if (server) {
      server.close(() => {
         process.exit(1);
      })
   }

   process.exit(1);
})

process.on('SIGINT', () => {

   console.log("sigInt rejecktion detected... server shutdown");

   if (server) {
      server.close(() => {
         process.exit(1);
      })
   }

   process.exit(1);
})


process.on('unhandledRejection', () => {

   console.log("Unhandle rejecktion detected... server shutdown");

   if (server) {
      server.close(() => {
         process.exit(1);
      })
   }

   process.exit(1);
})

process.on('uncaughtException', () => {

   console.log("Unhandle uncaught exceptions... server shutdown");

   if (server) {
      server.close(() => {
         process.exit(1);
      })
   }

   process.exit(1);
})
