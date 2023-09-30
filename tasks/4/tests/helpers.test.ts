import { shortenPublicHoliday, validateInput } from "../helpers";
import { SUPPORTED_COUNTRIES } from "../config";
import listPublickHolidays from "./__mocks__/listPublickHolidays.json";

const [GB] = SUPPORTED_COUNTRIES;
const YEAR = 2023;

describe("Testing Helper Methods", () => {
  test("[validateInput method] should return true if the parameters are valid", async () => {
    expect(validateInput({ country: GB, year: YEAR })).toBeTruthy();
  });

  test("[validateInput method] should throw an error if the country contains an invalid value", () => {
    const country = "invalid1234";
    expect(() => validateInput({ country: country, year: YEAR })).toThrowError(
      new Error(`Country provided is not supported, received: ${country}`)
    );
  });
  test("[validateInput method] should throw an error if the year contains an invalid value", () => {
    const year = 1234;

    expect(() => validateInput({ country: GB, year })).toThrowError(
      new Error(`Year provided not the current, received: ${year}`)
    );
  });

  test("[shortenPublicHoliday method] should return a formatted object", async () => {
    const holiday = listPublickHolidays[0];
    const formatHolidayObject = {
      name: holiday.name,
      localName: holiday.localName,
      date: holiday.date,
    };
    expect(shortenPublicHoliday(holiday)).toEqual(formatHolidayObject);
  });
});
