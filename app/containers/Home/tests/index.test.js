/**
 * Test the HomePage
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import { Home, mapDispatchToProps } from '../index';
// import { changeUsername } from '../actions';
import { loadInputs } from '../../App/actions';
import configureStore from '../../../configureStore';

describe('<Home />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Home
            loading={false}
            error={false}
            inputs={[]}
            dispatchInputs={jest.fn()}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should call dispatchInputs to fetch the user inputs on first mount', () => {
    const submitSpy = jest.fn();
    render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Home inputs={[]} dispatchInputs={submitSpy} />
        </IntlProvider>
      </Provider>,
    );
    expect(submitSpy).toHaveBeenCalled();
  });

  it('should not call dispatchInputs if inputs is not an empty array', () => {
    const submitSpy = jest.fn();
    render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Home inputs={['test']} dispatchInputs={submitSpy} />
        </IntlProvider>
      </Provider>,
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    describe('dispatchInputs', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.dispatchInputs).toBeDefined();
      });

      it('should dispatch loadInputs when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.dispatchInputs();
        expect(dispatch).toHaveBeenCalledWith(loadInputs());
      });
    });
  });
});
