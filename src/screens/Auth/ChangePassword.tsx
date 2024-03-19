// src/screens/ChangePassword.tsx
import { Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import * as Yup from 'yup';
import { AppTextInput } from '../../Components/index'; // Asegúrate de que la ruta de importación sea correcta
import api, { URLbase } from '../../api';
import Loader from '../../Components/Loader';
import { AuthContext } from '../../../App';
import axios from 'axios';
import FlashMessage, { showMessage } from 'react-native-flash-message';

const PasswordSchema = Yup.object().shape({
  password: Yup.string().min(2, '¡Demasiado corto!').max(50, '¡Demasiado largo!').required('Requerido'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null as any], 'Las contraseñas deben coincidir')
    .required('Requerido'),
});

export default function ChangePassword({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const authContext: any = useContext(AuthContext);
  const user = authContext.user;
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const email = params.get('email');
  const token = params.get('token');
  const userId = params.get('userId');
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    axios.get(`${URLbase}/auth/validateToken`, axiosConfig).then((response) => {
      if (response.status != 200) navigation.navigate('Login');
    });
  }, []);

  const handleChangePassword = async (values: { password: string; confirmPassword: string }) => {
    setIsLoading(true);
    try {
      await axios.put(`${URLbase}/users/${userId}`, { password: values.password }, axiosConfig).then((response) => {
        console.log(response);
      });

      showMessage({
        message: 'Contraseña cambiada con éxito',
        type: 'success',
      });
      navigation.navigate('Login');
    } catch (error: any) {
      console.log(error);
      showMessage({
        message: 'Error al cambiar la contraseña',
        description: error.message,
        type: 'danger',
      });
    }
    setIsLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <FlashMessage position='top' />
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
      <Button mode='text' onPress={() => navigation.navigate('Login')} style={{ justifyContent: 'center' }}>
        Volver
      </Button>
    </View>
  );
}
