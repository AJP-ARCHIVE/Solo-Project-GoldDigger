import { EventEmitter } from "node:events";
import { postNewInvestment } from "../utils/postNewInvestment.js";

// create a named event to trigger listener functions -> create/write to a log file for gold transactions 
export const investmentEvents = new EventEmitter()

// register the listener 
investmentEvents.on('gold-investment', postNewInvestment)