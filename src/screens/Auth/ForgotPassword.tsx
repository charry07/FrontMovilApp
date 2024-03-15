// src/screens/ForgotPassword.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { AppTextInput } from '../../Components/index'; // Asegúrate de que la ruta de importación sea correcta
import api from '../../api';
import Loader from '../../Components/Loader';

export default function ForgotPassword({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('charry072013@gmail.com');

  const handleResetPassword = async () => {
    setIsLoading(true);
    // Aquí deberías llamar a la API para resetear la contraseña
    const response = await api.post('/auth/forgot-password', { email });
    setIsLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Loader visible={isLoading} />
      <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>Olvidé mi contraseña</Text>
      <AppTextInput
        label='Email'
        value={email}
        onChangeText={(v) => setEmail(v)}
      />
      <Button mode='contained' onPress={handleResetPassword} style={{ marginBottom: 20 }}>
        Restablecer Contraseña
      </Button>
      <Button mode='text' onPress={() => navigation.goBack()} style={{ justifyContent: 'center' }}>
        Volver al Inicio de Sesión
      </Button>
    </View>
  );
}