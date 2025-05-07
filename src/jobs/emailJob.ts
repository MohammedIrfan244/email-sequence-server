import agenda from "../configs/agenda";
import Lead from "../models/leadModel";
import Template from "../models/templateModel";
import Flow from "../models/flowModel";
import { errorLogger } from "../lib/utils/devLogger";


interface EmailJobData {
    leadId: string;
    templateId: string;
    flowId: string;
}

agenda.define("send email", async (job: { attrs: { data: EmailJobData } }) => {
    const { leadId, templateId, flowId } = job.attrs.data;
    try{
        const lead = await Lead.findById(leadId)
        if (!lead) {
            errorLogger("Lead not found:" + leadId);
            return;
        }
        const template = await Template.findById(templateId);
        if (!template) {
            errorLogger("Template not found:" + templateId);
            return;
        }
        const flow = await Flow.findById(flowId);
        if (!flow) {
            errorLogger("Flow not found:" + flowId);
            return;
        }
        console.log("Sending email to:", lead.email);
        console.log("Email subject:", template.subject);
        console.log("Email body:", template.body);
    }catch(error){
        console.error("Error sending email:", error);
    }
});