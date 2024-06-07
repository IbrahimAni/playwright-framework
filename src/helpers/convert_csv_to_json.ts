import { convertCSVFileToJsonFile } from "../utils/csv_to_json";

export const convertToJson = (csv_name:string, json_name:string) => {
    convertCSVFileToJsonFile(csv_name, json_name);
}