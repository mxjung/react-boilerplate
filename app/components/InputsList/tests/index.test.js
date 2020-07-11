import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { render } from 'react-testing-library';

import InputsLIst from '../index';
import configureStore from '../../../configureStore';

describe('<InputsLIst />', () => {
  it('should render the loading indicator when its loading', () => {
    const { container } = render(<InputsLIst loading />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render an error if loading failed', () => {
    const { queryByText } = render(
      <IntlProvider locale="en">
        <InputsLIst loading={false} error={{ message: 'Loading failed!' }} />
      </IntlProvider>,
    );
    expect(queryByText(/Something went wrong/)).not.toBeNull();
  });

  it('should render the inputs if loading was successful', () => {
    const store = configureStore({ global: null }, browserHistory);
    const inputs = ['test'];
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <InputsLIst inputs={inputs} error={false} />
        </IntlProvider>
      </Provider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not render anything if nothing interesting is provided', () => {
    const { container } = render(
      <InputsLIst inputs={false} error={false} loading={false} />,
    );

    expect(container.firstChild).toBeNull();
  });
});
