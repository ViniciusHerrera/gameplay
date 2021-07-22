import React, { useState, useCallback } from "react";
import { View, FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Appointment, AppointmentsProps } from "../../components/Appointment";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { CategorySelect } from "../../components/CategorySelect";
import { ListDivider } from "../../components/ListDivider";
import { ListHeader } from "../../components/ListHeader";
import { Background } from "../../components/Background";
import { ButtonAdd } from "../../components/ButtonAdd";
import { Profile } from "../../components/Profile";
import { Load } from "../../components/Load";

import { styles } from "./styles";

export function Home() {
  const navigation = useNavigation();
  const [category, setCategory] = useState('');
  const [appointments, setAppointments] = useState<AppointmentsProps[]>([]);
  const [loading, setLoading] = useState(false);

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  // function handleAppointmentDetails(guildSelected: AppointmentsProps) {
  //   navigation.navigate('AppointmentDetails', guildSelected); // Passa a guild como parametro para a interface
  // }

  function handleAppointmentDetails(guildSelected: AppointmentsProps) {
    navigation.navigate('AppointmentDetails', { guildSelected });
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate');
  }

  async function loadAppointments() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentsProps[] = response ? JSON.parse(response) : []; //Define a tipagem do nosso appointments

    if (category) {
      setAppointments(storage.filter(item => item.category === category));
    } else {
      setAppointments(storage);
    }

    setLoading(false);
  }

  // Utilizado para renderizar toda tela novamente, e precisa do callback
  useFocusEffect(useCallback(() => {
    loadAppointments();
  }, [category]));  // Nosso category que ira recarregar a listagem

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>

      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />

      {
        loading ? <Load /> :
          <>
            <ListHeader
              title="Partidas agendadas"
              subtitle={`Total ${appointments.length}`}
            />

            <FlatList
              data={appointments}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Appointment
                  data={item}
                  onPress={() => handleAppointmentDetails(item)}
                />
              )}
              contentContainerStyle={{ paddingBottom: 69 }}
              style={styles.matches}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <ListDivider />} // Adiciona a lista um separador de elementos
            />
          </>
      }
    </Background>
  );
}