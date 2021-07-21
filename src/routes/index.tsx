import React from "react";
import { NavigationContainer } from '@react-navigation/native'

import { useAuth } from "../hooks/auth";

import { AppRoutes } from './app.routes';
import { SignIn } from "../screens/Signin";

export function Routes() {
  const { user } = useAuth();

  //Se tiver usuário autenticado leva para a tela de home

  return (
    <NavigationContainer>
      {user.id ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}