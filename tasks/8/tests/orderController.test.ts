import { createOrder } from "../services/order.service";
import { Request, Response } from "express";
import { SERVER_ERROR_RESPONSE } from "../controllers/const";
import OrderController from "../controllers/order.controller";

jest.mock("../services/order.service", () => ({
  createOrder: jest.fn(),
}));

describe("OrderController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonResponse: unknown;
  let statusCode: number;

  beforeEach(() => {
    jest.clearAllMocks();

    mockRequest = {
      user: { _id: "123" },
    } as unknown as Partial<Request>;

    jsonResponse = {};
    statusCode = 0;
    mockResponse = {
      status: jest.fn().mockImplementation((status: number) => {
        statusCode = status;
        return mockResponse;
      }),
      json: jest.fn().mockImplementation((result) => {
        jsonResponse = result;
      }),
    };
  });

  it("should create an order and respond with status 201", () => {
    const orderData = { orderId: "order123" };
    (createOrder as jest.Mock).mockReturnValue(orderData);

    OrderController.createOrder(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(statusCode).toBe(201);
    expect(jsonResponse).toEqual({
      data: orderData,
      error: null,
    });
    expect(createOrder).toHaveBeenCalledWith("123");
  });

  it("should handle errors and respond with status 500", () => {
    const errorMessage = "Error creating order";
    (createOrder as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    OrderController.createOrder(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(statusCode).toBe(500);
    expect(jsonResponse).toEqual(SERVER_ERROR_RESPONSE);
  });
});
