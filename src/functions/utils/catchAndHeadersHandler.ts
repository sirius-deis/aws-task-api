import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const HEADERS = {
  'Content-Type': 'application.json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

const ERROR_MESSAGE = 'Something went wrong';

const catchAndHeadersMiddleware =
  (handler: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const response = await handler(event);

      response.headers = { ...response.headers, ...HEADERS };

      return response;
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({
          message: (error.statusCode && error.message && error.message) || ERROR_MESSAGE,
        }),
        headers: HEADERS,
      };
    }
  };

export default catchAndHeadersMiddleware;
