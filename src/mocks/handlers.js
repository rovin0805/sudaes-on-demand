import { rest } from 'msw';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const scoopsRest = rest.get(`${BASE_URL}/scoops`, (req, res, ctx) => {
  return res(
    ctx.json([
      { name: 'Chocolate', imagePath: '/images/chocolate.png' },
      { name: 'Vanilla', imagePath: '/images/vanilla.png' },
    ])
  );
});

const toppingsRest = rest.get(`${BASE_URL}/toppings`, (req, res, ctx) => {
  return res(
    ctx.json([
      { name: 'Cherries', imagePath: '/images/cherries.png' },
      { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
      { name: 'Hot fudge', imagePath: '/images/hot-fudge.png' },
    ])
  );
});

const postOrderRest = rest.post(`${BASE_URL}/order`, async (req, res, ctx) => {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  await sleep(100);
  return res(ctx.json({ orderNumber: 123455676 }));
});

export const handlers = [scoopsRest, toppingsRest, postOrderRest];
