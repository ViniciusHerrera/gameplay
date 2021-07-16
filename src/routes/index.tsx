import React from "react";
import { NavigationContainer } from '@react-navigation/native'

import { useAuth } from "../hooks/auth";

import { AuthRoutes } from './auth.routes';
import { SignIn } from "../screens/Signin";

export function Routes() {
  const { user } = useAuth();

  //Se tiver usuário autenticado leva para a tela de home

  return (
    <NavigationContainer>
      {user.id ? <AuthRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}