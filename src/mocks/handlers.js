import { rest } from 'msw';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const handlers = [
  rest.get(`${BASE_URL}/scoops`, (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Chocolate', imagePath: '/images/chocolate.png' },
        { name: 'Vanilla', imagePath: '/images/vanilla.png' },
      ])
    );
  }),
];
