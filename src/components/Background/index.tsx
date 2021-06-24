import React, { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

// Cria a tipagem que recebe qualquer componente do React
type Props = {
  children: ReactNode;
}

// Adiciona a tipagem para a função
export function Background({ children }: Props) {

  // Para evitar repetição no meio do nosso código desistruturamos as cores
  const { secondary100, secondary80 } = theme.colors;

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary80, secondary100]}
    >
      {children}
    </LinearGradient>
  );
}