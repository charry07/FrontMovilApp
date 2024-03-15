// src/screens/Profile.tsx
import React, { useContext } from 'react';
import { View } from 'react-native';
import { Avatar, Button, Caption, Paragraph, Title } from 'react-native-paper';
import { AuthContext } from '../../../App';

export default function Profile({ navigation }: any) {
  const user: any = useContext(AuthContext)?.user;

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      }}>
      <Avatar.Image
        source={{
          uri: user.avatar || 'https://www.example.com/path/to/avatar.jpg',
        }}
        size={80}
      />
      <Title style={{ marginTop: 15, textAlign: 'center' }}>{user.username || 'Nombre de Usuario'}</Title>
      <Caption style={{ textAlign: 'center' }}>{user.email || 'usuario@example.com'}</Caption>
      <Caption style={{ textAlign: 'center' }}>{user.firstName || 'Nombre'}</Caption>
      <Caption style={{ textAlign: 'center' }}>{user.lastName || 'Apellido'}</Caption>
      <Caption style={{ textAlign: 'center' }}>{user.birthDate || 'Fecha de Nacimiento'}</Caption>
      <Caption style={{ textAlign: 'center' }}>{user.phoneNumber || 'Número de Teléfono'}</Caption>
      <Paragraph style={{ marginTop: 20, textAlign: 'center' }}>Aquí puedes editar tu perfil y configurar tus preferencias.</Paragraph>
      <Button mode='contained' onPress={() => navigation.navigate('EditProfile')} style={{ marginTop: 20 }}>
        Editar Perfil
      </Button>
    </View>
  );
}
