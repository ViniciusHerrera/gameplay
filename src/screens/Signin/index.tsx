import React from 'react';
import { View, Text, Image, StatusBar } from 'react-native';

import IllustrationImg from '../../assets/illustration.png';
import { styles } from './styles';
import { ButtonIcon } from '../../components/ButtonIcon/Index';

export function SignIn() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent //Faz com que o conteudo cole no topo da tela
      />

      <Image
        source={IllustrationImg}
        style={styles.image}
        resizeMode="stretch" //Redimensionando a imagem
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          Conecte-se{'\n'}
          e organize suas{'\n'}
          jogatinas
        </Text>

        <Text style={styles.subtitle}>
          Crie grupos para jogar seus games{'\n'}
          favoritos com seus amigos
        </Text>

        <ButtonIcon
          title="Entrar com Discord"
          activeOpacity={0.7}
        />
      </View>
    </View>
  );
}
