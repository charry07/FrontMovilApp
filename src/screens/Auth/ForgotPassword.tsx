// src/screens/ForgotPassword.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { AppTextInput } from '../../Components/index'; // Asegúrate de que la ruta de importación sea correcta
import api from '../../api';
import Loader from '../../Components/Loader';
import FlashMessage, { showMessage } from "react-native-flash-message";

export default function ForgotPassword({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('charry072013@gmail.com');

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/forgotPassword', { email });
      console.log(response.data);
      showMessage({
        message: "Correo enviado con éxito",
        type: "success",
        position: 'top',
      });
    } catch (error) {
      showMessage({
        message: "Hubo un error al enviar el correo",
        type: "danger",
        position: 'top',
      });
    }
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
      <FlashMessage position="top" />
    </View>
  );
}