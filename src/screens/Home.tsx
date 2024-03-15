// src/screens/Home.tsx
import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function Home({ navigation }: any) {
  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center', color: '#333' }}>Bienvenido</Text>
      <Button mode='contained' onPress={() => navigation.navigate('OrderFood')} style={{ marginBottom: 20 }}>
        Ordenar Comida
      </Button>
      <Button mode='contained' onPress={() => navigation.navigate('OrderRide')} style={{ marginBottom: 20 }}>
        Ordenar Viaje
      </Button>
      <Button mode='contained' onPress={() => navigation.navigate('Profile')} style={{ marginBottom: 20 }}>
        Ver Perfil
      </Button>
    </View>
  );
}
