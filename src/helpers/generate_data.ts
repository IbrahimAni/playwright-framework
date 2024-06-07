import { generateUserTestDataArr, exportToJson, exportToCsv  } from "../utils/FakerDataUtil";

export const exportUserDataAsJsonFile = (data_size:number) => {
    const testData = generateUserTestDataArr(data_size);
    exportToJson(testData, "fake_user_data.json");
}
