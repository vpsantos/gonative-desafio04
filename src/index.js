import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import 'config/ReactotronConfig';
import { store, persistor } from 'store';

import createNavigator from 'routes';
import ErrorBox from 'components/ErrorBox';

const Routes = createNavigator();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routes />
      <ErrorBox />
    </PersistGate>
  </Provider>
);

export default App;
