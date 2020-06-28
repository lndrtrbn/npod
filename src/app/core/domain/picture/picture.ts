import { dashToCamelCase } from "../../shared/utils";

/**
 * Represents the data of a picture retrieved from the APOD Nasa API.
 */
export interface IPicture {
    date: string;
    explanation: string;
    udurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
}

export class Picture {
    date: Date;
    explanation: string;
    hdurl: string;
    mediaType: string;
    serviceVersion: string;
    title: string;
    url: string;

    constructor(data: IPicture) {
        Object.keys(data || {}).forEach(property => {
            if (property === "date") {
                this[property] = new Date(data[property]);
            } else {
                this[dashToCamelCase(property)] = data[property];
            }
        });
    }
}