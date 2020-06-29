import { dashToCamelCase } from "../../shared/utils";
import * as moment from "moment";

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

    /**
     * Returned the date as a string.
     *
     * @returns Date stringified in a format used by the template.
     */
    get displayableDate(): string {
        if (!this.date) return "";
        return moment(this.date).format("MM.DD");
    }

    /**
     * Returned the date as a string in a format comprehensive for the APOD API.
     *
     * @returns Date stringified in a format used by the APOD API.
     */
    get apiFormatDate(): string {
        if (!this.date) return "";
        return moment(this.date).format("YYYY-MM-DD");
    }
}