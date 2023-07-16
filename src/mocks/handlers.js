import { rest } from 'msw';

const BASE_URL = 'http://localhost:3000';

export const handlers = [
  rest.get(`${BASE_URL}/scoop`, (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Chocolate', imagePath: '/images/chocolate.png' },
        { name: 'Vanilla', imagePath: '/images/vanilla.png' },
      ])
    );
  }),
];
