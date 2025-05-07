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
        await agenda.start();
        agenda.on("start", (job) => {
            console.log(`Job ${job.attrs.name} starting...`);
        });
        agenda.on("complete", (job) => {
            console.log(`Job ${job.attrs.name} finished!`);
        }
        )
    }

    export {startAgenda}

    export default agenda;