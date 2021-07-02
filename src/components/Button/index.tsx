import React from "react";
import { Text } from 'react-native';
import { RectButton, RectButtonProps } from "react-native-gesture-handler";


import { styles } from "./styles";

// Definindo a tipagem dos valores passado para o botão, similar ao interface
type Props = RectButtonProps & { // Recebe todas propriedades do TouchableOpacity + a que definimos
  title: string;
}

export function Button({ title, ...rest }: Props) {
  return (
    <RectButton
      style={styles.container}
      {...rest}
    >
      <Text style={styles.title}>
        {title}
      </Text>

    </RectButton>
  );
}