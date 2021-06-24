import React from "react";
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from "../screens/Home";
import { SignIn } from "../screens/Signin";

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    // Paramtros para customizar nossa pilha de navegação
    <Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: 'transparent'
        }
      }}
    >
      {/* A ordem que as telas são inseridas nesse arquivo, define a ordem de apresentação */}

      <Screen
        name="SingIn"
        component={SignIn}
      />

      <Screen
        name="Home"
        component={Home}
      />
    </Navigator>
  );
}