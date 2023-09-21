import axios from "axios";
import {
  checkIfTodayIsPublicHoliday,
  getListOfPublicHolidays,
  getNextPublicHolidays,
} from "../services/public-holidays.service";
import { SUPPORTED_COUNTRIES } from "../config";
import listPublickHolidays from "./__mocks__/listPublickHolidays.json";
import listNextPublickHolidays from "./__mocks__/listNextPublickHolidays.json";

const [GB] = SUPPORTED_COUNTRIES;
const YEAR = 2023;

describe("[getListOfPublicHolidays method] Get list of public holidays by country", () => {
  test("should return list of public holidays", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ data: listPublickHolidays }));

    const response = await getListOfPublicHolidays(YEAR, GB);
    expect(response.length).toEqual(listPublickHolidays.length);
  });

  test("should return an empty list if the parameters are invalid", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        data: {
          type: "https://tools.ietf.org/html/rfc7231#section-6.5.4",
          title: "Not Found",
          status: 404,
          traceId: "00-97ee6e63d290fe74077946dcd9d96838-8d60df2cd15a0165-00",
        },
      })
    );

    const response = await getListOfPublicHolidays(YEAR, GB);
    expect(response.length).toEqual(0);
  });

  test("should call API with proper arguments", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ data: listPublickHolidays }));

    await getListOfPublicHolidays(YEAR, GB);
    expect(axiosGetSpy).toHaveBeenCalledWith(
      `https://date.nager.at/api/v3/PublicHolidays/${YEAR}/${GB}`
    );
  });

  test("should throw an error if the country contains an invalid value", async () => {
    const country = "invalid1234";
    await expect(getListOfPublicHolidays(YEAR, country)).rejects.toThrow(
      new Error(`Country provided is not supported, received: ${country}`)
    );
  });

  test("should throw an error if the year contains an invalid value", async () => {
    const year = 1234;
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ data: listPublickHolidays }));

    await expect(getListOfPublicHolidays(year, GB)).rejects.toThrow(
      new Error(`Year provided not the current, received: ${year}`)
    );
  });

  afterEach(() => {
    // clear all mocks to make sure that they won't be passed to any tests out of this file
    jest.clearAllMocks();
  });

  describe("Integration tests", () => {
    test("should get list of public holidays", async () => {
      const response = await getListOfPublicHolidays(YEAR, GB);
      expect(response.length).toBeGreaterThanOrEqual(0);
    });
  });
});

describe("[checkIfTodayIsPublicHoliday method] Check if today is public holiday", () => {
  test("should return true if today is public holidays", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ status: 200 }));

    const isTodayHoliday = await checkIfTodayIsPublicHoliday(GB);
    expect(isTodayHoliday).toBeTruthy();
  });

  test("should return false if today isn't public holidays", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ status: 204 }));

    const isTodayHoliday = await checkIfTodayIsPublicHoliday(GB);
    expect(isTodayHoliday).toBeFalsy();
  });

  test("should call API with proper arguments", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ status: 200 }));

    await checkIfTodayIsPublicHoliday(GB);
    expect(axiosGetSpy).toHaveBeenCalledWith(
      `https://date.nager.at/api/v3/IsTodayPublicHoliday/${GB}`
    );
  });

  test("should throw an error if the country contains an invalid value", async () => {
    const country = "invalid1234";
    await expect(checkIfTodayIsPublicHoliday(country)).rejects.toThrow(
      new Error(`Country provided is not supported, received: ${country}`)
    );
  });

  afterEach(() => {
    // clear all mocks to make sure that they won't be passed to any tests out of this file
    jest.clearAllMocks();
  });

  describe("Integration tests", () => {
    test("should return false if today is public holidays", async () => {
      const isTodayHoliday = await checkIfTodayIsPublicHoliday(GB);
      expect(isTodayHoliday).toBeFalsy();
    });
  });
});

describe("[getNextPublicHolidays method] Get next public holidays", () => {
  test("should return list of next public holidays", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.resolve({ data: listNextPublickHolidays })
      );

    const response = await getNextPublicHolidays(GB);
    expect(response.length).toEqual(listNextPublickHolidays.length);
  });

  test("should return an empty list if the parameters are invalid", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ status: 500 }));

    const response = await getNextPublicHolidays(GB);
    expect(response.length).toEqual(0);
  });

  test("should call API with proper arguments", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.resolve({ data: listNextPublickHolidays })
      );

    await getNextPublicHolidays(GB);
    expect(axiosGetSpy).toHaveBeenCalledWith(
      `https://date.nager.at/api/v3/NextPublicHolidays/${GB}`
    );
  });

  test("should throw an error if the country contains an invalid value", async () => {
    const country = "invalid1234";
    await expect(getNextPublicHolidays(country)).rejects.toThrow(
      new Error(`Country provided is not supported, received: ${country}`)
    );
  });

  afterEach(() => {
    // clear all mocks to make sure that they won't be passed to any tests out of this file
    jest.clearAllMocks();
  });

  describe("Integration tests", () => {
    test("should get list of next public holidays", async () => {
      const response = await getNextPublicHolidays(GB);
      expect(response.length).toBeGreaterThanOrEqual(0);
    });
  });
});
