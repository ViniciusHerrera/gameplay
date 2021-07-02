import React from 'react';
import { View, FlatList } from 'react-native';

import { ListDivider } from '../../components/ListDivider';
import { GuildProps } from '../../components/Guild';
import { Guild } from '../../components/Guild';

import { styles } from './styles';

type Props = {
  handleGuildSelect: (guild: GuildProps) => void; // Retorna void
}

export function Guilds({ handleGuildSelect }: Props) {
  const guilds = [
    {
      id: '1',
      name: 'Lendários',
      icon: 'image.png',
      owner: true,
    },
    {
      id: '2',
      name: 'Galera do Game',
      icon: 'image1.png',
      owner: true,
    },
  ]

  return (
    <View style={styles.container}>
      <FlatList
        data={guilds}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Guild
            data={item}
            onPress={() => handleGuildSelect(item)} // Passa a função para o Guild e retorna pro pai
          />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ListDivider />}
        style={styles.guilds}
      />
    </View>
  );
}