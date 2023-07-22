import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { server } from '../../../mocks/server';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';

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

test('disable order button if there are no scoops ordered', async () => {
  const user = userEvent.setup();
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  // order button should be disabled at first, even before options load
  const orderButton = screen.getByRole('button', { name: /order sundae/i });
  expect(orderButton).toBeDisabled();

  // expect button to be enabled after adding scoop
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(orderButton).toBeEnabled();

  // expect button to be disabled again after removing scoop
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '0');
  expect(orderButton).toBeDisabled();
});
