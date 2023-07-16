import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { server } from '../../../mocks/server';
import { rest } from 'msw';

const BASE_URL = process.env.REACT_APP_BASE_URL;

test('handles error for scoops and toppings routes', async () => {
  const scoopsRest = rest.get(`${BASE_URL}/scoops`, (req, res, ctx) =>
    res(ctx.status(500))
  );
  const toppingsRest = rest.get(`${BASE_URL}/toppings`, (req, res, ctx) =>
    res(ctx.status(500))
  );
  server.resetHandlers(scoopsRest, toppingsRest);

  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});
