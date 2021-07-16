import React from 'react'; //Importa função para usar contexto
import { View, Text, Image, Alert, ActivityIndicator } from 'react-native';

import { useAuth } from '../../hooks/auth';

import IllustrationImg from '../../assets/illustration.png';
import { styles } from './styles';

import { ButtonIcon } from '../../components/ButtonIcon';
import { Background } from '../../components/Background';
import { theme } from '../../global/styles/theme';

export function SignIn() {

  const { loading, singIn } = useAuth();

  async function handleSingIn() {
    try {
      await singIn();
    } catch (error) {
      Alert.alert(error);
    }
  }

  return (
    <Background>
      <View style={styles.container}>

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

          {
            loading ? <ActivityIndicator color={theme.colors.primary} /> :
              <ButtonIcon
                title="Entrar com Discord"
                onPress={handleSingIn}
              />
          }
        </View>
      </View>
    </Background>
  );
}
