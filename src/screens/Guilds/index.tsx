import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';

import { ListDivider } from '../../components/ListDivider';
import { Guild, GuildProps } from '../../components/Guild';
import { Load } from '../../components/Load';

import { styles } from './styles';
import { api } from '../../services/api';

type Props = {
  handleGuildSelect: (guild: GuildProps) => void; // Retorna void
}

export function Guilds({ handleGuildSelect }: Props) {
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchGuilds() {
    const response = await api.get('/users/@me/guilds');

    setGuilds(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchGuilds();
  }, [])

  return (
    <View style={styles.container}>
      {
        loading ? <Load /> :
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
            contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            ListHeaderComponent={() => <ListDivider isCentered />}
            style={styles.guilds}
          />
      }
    </View>
  );
}