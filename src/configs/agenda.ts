import Agenda from "agenda";
import dotenv from "dotenv";

dotenv.config();


const agenda = new Agenda({
    db: {
        address: process.env.MONGODB_URI as string,
        collection: "agendaJobs",
    },
    processEvery: "1 minute",
    });

    const startAgenda = async () => {
        try {
            await agenda.start();
        }catch (error) {
            console.error("Error starting agenda:", error);
        }
    }

    export {startAgenda}

    export default agenda;