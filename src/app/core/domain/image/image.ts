import { dashToCamelCase } from "../../shared/utils";

/**
 * Represents the data of an image retrieved from the APOD Nasa API.
 */
export interface IImage {
    date: string;
    explanation: string;
    udurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
}

export class Image {
    date: Date;
    explanation: string;
    hdurl: string;
    mediaType: string;
    serviceVersion: string;
    title: string;
    url: string;

    constructor(data: IImage) {
        Object.keys(data || {}).forEach(property => {
            if (property === "date") {
                this[property] = new Date(data[property]);
            } else {
                this[dashToCamelCase(property)] = data[property];
            }
        });
    }
}