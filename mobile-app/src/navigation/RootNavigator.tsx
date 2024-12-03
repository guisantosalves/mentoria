import React from 'react';
import { useAuth } from './context/AuthContext';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

const RootNavigator = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
