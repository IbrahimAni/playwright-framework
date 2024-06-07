import * as fs from 'fs';
import path from 'path';

const CSVToJSON = (data: string, delimiter: string = ','): Array<Record<string, string>> => {
    const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
    return data
        .slice(data.indexOf('\n') + 1)
        .split('\n')
        .filter((line) => line.trim() !== '') // Filter out empty lines
        .map((v) => {
            const values = v.split(delimiter);
            return titles.reduce(
                (obj, title, index) => {
                    obj[title.trim()] = values[index].trim();
                    return obj;
                },
                {} as Record<string, string>
            );
        });
};

// Example usage
const currentDir = __dirname;
// Go one level above (back to 'src')
const srcDir = path.resolve(currentDir, "../");

// Change to 'config' folder
const testdataDir = path.resolve(srcDir, "data");

export const convertCSVFileToJsonFile = (csvFileName: string, jsonFileName: string, delimiter: string = ',') => {
    try {
        // Read the CSV file
        const csvData = fs.readFileSync(path.join(testdataDir, csvFileName), 'utf8');

        // Convert CSV to JSON
        const jsonData = CSVToJSON(csvData, delimiter);

        // Write JSON data to a new file
        fs.writeFileSync(path.join(testdataDir, jsonFileName), JSON.stringify(jsonData, null, 2));
    } catch (error) {
        throw new Error(`Error converting CSV to JSON: ${error}`);
    }
};
