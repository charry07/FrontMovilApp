import React from 'react';
import { View, Text, Button } from 'react-native';

export default function OrderDetails({ navigation }:any) {
  return (
    <View>
      <Text>Esta es la pantalla de detalles del pedido</Text>
      <Button title="Volver a Inicio" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}