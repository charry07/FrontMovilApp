import React from 'react';
import { View, Text, Button } from 'react-native';

export default function OrderRide({ navigation }:any) {
  return (
    <View>
      <Text>Esta es la pantalla para pedir un viaje</Text>
      <Button title="Ver Detalles del Pedido" onPress={() => navigation.navigate('OrderDetails')} />
      <Button title="Ver Perfil" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}