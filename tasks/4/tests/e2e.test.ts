import request from "supertest";
import { PUBLIC_HOLIDAYS_API_URL, SUPPORTED_COUNTRIES } from "../config";
const [GB] = SUPPORTED_COUNTRIES;
describe("Country API", () => {
  describe("/CountryInfo", () => {
    test("should return 200 and country info", async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/CountryInfo/${GB}`
      );

      expect(status).toEqual(200);
      expect(body).toEqual({
        commonName: expect.any(String),
        officialName: expect.any(String),
        countryCode: expect.any(String),
        region: expect.any(String),
        borders: expect.any(Array || null),
      });
    });
  });
  describe("/AvailableCountries", () => {
    test("should return 200 and list available countries", async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/AvailableCountries`
      );

      expect(status).toEqual(200);
      body.forEach((breed: any) => {
        expect(breed).toEqual({
          countryCode: expect.any(String),
          name: expect.any(String),
        });
      });
    });
  });
});

describe("Version API", () => {
  describe("/Version", () => {
    test("should return 200 and version info", async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/Version`
      );

      expect(status).toEqual(200);
      expect(body).toEqual({
        name: expect.any(String),
        version: expect.any(String),
      });
    });
  });
});
