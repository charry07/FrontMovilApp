// src/screens/Login.tsx
import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import * as Yup from 'yup';
import { AppTextInput } from '../../Components/index'; // Asegúrate de que la ruta de importación sea correcta
import api from '../../api';
import Loader from '../../Components/Loader';
import { AuthContext } from '../../../App';
import FlashMessage, { showMessage } from 'react-native-flash-message';

const LoginSchema = Yup.object().shape({
  email: Yup.string().min(2, '¡Demasiado corto!').max(50, '¡Demasiado largo!').required('Requerido'),
  password: Yup.string().min(2, '¡Demasiado corto!').max(50, '¡Demasiado largo!').required('Requerido'),
});

export default function Login({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const authContext: any = useContext(AuthContext);

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <FlashMessage position='top' />
      <Loader visible={isLoading} />
      <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>Inicio de Sesión</Text>
      <Formik
        initialValues={{ email: 'charry072013@gmail.com', password: 'Charry07' }}
        validationSchema={LoginSchema}
        onSubmit={async (values) => {
          setIsLoading(true);
          try {
            const response = await api.post('/auth/login', values);
            if (response.data.token) {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('user', JSON.stringify(response.data.user));
              await authContext.setUser(response.data.user);
              window.location.reload();
            } else {
              showMessage({
                message: 'Error',
                description: 'No se pudo iniciar sesión. Por favor, inténtalo de nuevo.',
                type: 'danger',
              });
            }
          } catch (error:any) {
            showMessage({
              message: 'Error',
              description: error.message,
              type: 'danger',
            });
          } finally {
            setIsLoading(false);
          }
        }}>
        {({ setFieldValue, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <AppTextInput
              label='Email'
              value={values.email}
              onChangeText={(v) => setFieldValue('email', v)}
              onBlur={() => handleBlur('email')}
              errorText={(touched.email && errors.email) || ''}
            />
            <AppTextInput
              label='Contraseña'
              value={values.password}
              onChangeText={(v) => setFieldValue('password', v)}
              onBlur={() => handleBlur('password')}
              errorText={(touched.password && errors.password) || ''}
              secureTextEntry
            />
            <Button mode='contained' onPress={() => handleSubmit()} style={{ marginBottom: 20 }}>
              Enviar
            </Button>
            <Button mode='text' onPress={() => navigation.navigate('ForgotPassword')}>
              Olvidé mi contraseña
            </Button>
          </View>
        )}
      </Formik>
      <Button mode='text' onPress={() => navigation.navigate('Register')} style={{ justifyContent: 'center' }}>
        Ir al Registro
      </Button>
    </View>
  );
}
