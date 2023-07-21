import { handlerPath } from '@libs/handler-resolver';

export const getAllProducts = {
  handler: `${handlerPath(__dirname)}/handler.getAllProducts`,
  events: [
    {
      http: {
        method: 'get',
        path: 'items',
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
        path: 'items/{id}',
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
        path: 'items',
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
        path: 'items/{id}',
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
        path: 'items/{id}',
      },
    },
  ],
};
