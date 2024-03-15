// src/screens/ChangePassword.tsx
import { Formik } from 'formik';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import * as Yup from 'yup';
import { AppTextInput } from '../../Components/index'; // Asegúrate de que la ruta de importación sea correcta
import api from '../../api';
import Loader from '../../Components/Loader';

const PasswordSchema = Yup.object().shape({
  password: Yup.string().min(2, '¡Demasiado corto!').max(50, '¡Demasiado largo!').required('Requerido'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null as any], 'Las contraseñas deben coincidir')
    .required('Requerido'),
});

export default function ChangePassword({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async (values: { password: string; confirmPassword: string }) => {
    setIsLoading(true);
    // Aquí deberías llamar a la API para cambiar la contraseña
    // const response = await api.post('/auth/change-password', { password: values.password });
    setIsLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Loader visible={isLoading} />
      <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>Cambiar Contraseña</Text>
      <Formik initialValues={{ password: '', confirmPassword: '' }} validationSchema={PasswordSchema} onSubmit={handleChangePassword}>
        {({ setFieldValue, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <AppTextInput
              label='Nueva Contraseña'
              value={values.password}
              onChangeText={(v) => setFieldValue('password', v)}
              onBlur={() => handleBlur('password')}
              errorText={(touched.password && errors.password) || ''}
              secureTextEntry
            />
            <AppTextInput
              label='Confirmar Contraseña'
              value={values.confirmPassword}
              onChangeText={(v) => setFieldValue('confirmPassword', v)}
              onBlur={() => handleBlur('confirmPassword')}
              errorText={(touched.confirmPassword && errors.confirmPassword) || ''}
              secureTextEntry
            />
            <Button mode='contained' onPress={() => handleSubmit()} style={{ marginBottom: 20 }}>
              Cambiar Contraseña
            </Button>
          </View>
        )}
      </Formik>
      <Button mode='text' onPress={() => navigation.goBack()} style={{ justifyContent: 'center' }}>
        Volver
      </Button>
    </View>
  );
}
