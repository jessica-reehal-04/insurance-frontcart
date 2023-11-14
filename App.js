import React from 'react';
import { OrderProvider } from './OrderContext';
import ContextApp from './ContextApp';
import UserDetailsForm from './UserDetailsForm';

function App() {
  return (
    <OrderProvider>
      <ContextApp />
      <UserDetailsForm/>
    </OrderProvider>
  );
}

export default App;
