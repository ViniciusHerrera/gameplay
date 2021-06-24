declare module "*.svg" {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';

  const content: React.FC<SvgProps> //Declara que o conteudo é um componente funcional

  export default content;
}