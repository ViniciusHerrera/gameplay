import React from "react";
import { Text, Image, View, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import DiscordImg from '../../assets/discord.png';

import { styles } from "./styles";

// Definindo a tipagem dos valores passado para o botão, similar ao interface
type Props = TouchableOpacityProps & { // Recebe todas propriedades do TouchableOpacity + a que definimos
  title: string;
}

export function ButtonIcon({ title, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      {...rest}
    >

      <View style={styles.iconWrapper}>
        <Image
          source={DiscordImg}
          style={styles.icon}
        />
      </View>

      <Text style={styles.title}>
        {title}
      </Text>

    </TouchableOpacity>
  );
}