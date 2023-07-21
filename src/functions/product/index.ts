import { handlerPath } from '@libs/handler-resolver';

const inputType = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    price: { type: 'number' },
  },
  required: ['title', 'price'],
};

export const getAllProducts = {
  handler: `${handlerPath(__dirname)}/handler.getAllProducts`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
      },
    },
  ],
};

export const getProduct = {
  handler: `${handlerPath(__dirname)}/handler.getProduct`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{id}',
      },
    },
  ],
};

export const addProduct = {
  handler: `${handlerPath(__dirname)}/handler.addProduct`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        request: {
          schemas: {
            'application/json': inputType,
          },
        },
      },
    },
  ],
};

export const deleteProduct = {
  handler: `${handlerPath(__dirname)}/handler.deleteProduct`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'products/{id}',
      },
    },
  ],
};

export const updateProduct = {
  handler: `${handlerPath(__dirname)}/handler.updateProduct`,
  events: [
    {
      http: {
        method: 'patch',
        path: 'products/{id}',
        request: {
          schemas: {
            'application/json': inputType,
          },
        },
      },
    },
  ],
};
