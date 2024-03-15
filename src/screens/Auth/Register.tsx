// src/screens/Register.tsx
import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Modal, Portal, Provider, Text } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { theme } from '../../theme';
import { AppTextInput } from '../../Components/index'; // Asegúrate de que la ruta de importación sea correcta
import api from '../../api';
import Loader from '../../Components/Loader';
import { AuthContext } from '../../../App';

const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(2, '¡Demasiado corto!').max(50, '¡Demasiado largo!').required('Requerido'),
  email: Yup.string().email('¡Debe ser un correo electrónico válido!').min(2, '¡Demasiado corto!').max(50, '¡Demasiado largo!').required('Requerido'),
  password: Yup.string().min(2, '¡Demasiado corto!').max(50, '¡Demasiado largo!').required('Requerido'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null as any], 'Las contraseñas deben coincidir')
    .required('Requerido'),
});

export default function Register({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const authContext: any = useContext(AuthContext);
  return (
    <Provider theme={theme}>
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>Registro</Text>
        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '', username: '' }}
          validationSchema={RegisterSchema}
          onSubmit={async (values) => {
            setIsLoading(true);
            const response = await api.post('/auth/register', values);
            console.log(response.data);
            if (response.data.token) {
              await authContext.setUser(response.data.user);
              localStorage.setItem('user',JSON.stringify(response.data.user));
              localStorage.setItem('token', response.data.token);
            }
            setModalMessage(response.data.message);
            setOpenModal(true);
            setIsLoading(false);
          }}>
          {({ setFieldValue, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <Loader visible={isLoading} />

              <Portal>
                <Dialog visible={OpenModal} onDismiss={() => setOpenModal(false)}>
                  <Dialog.Title>Notificación</Dialog.Title>
                  <Dialog.Content>
                    <Text>{modalMessage}</Text>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button
                      onPress={() => {
                        setOpenModal(false);
                        window.location.reload();
                      }}>
                      Ok
                    </Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>

              <AppTextInput
                label='Nombre de Usuario'
                value={values.username}
                onChangeText={(v) => setFieldValue('username', v)}
                onBlur={() => handleBlur('username')}
                errorText={(touched.username && errors.username) || ''}
              />
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
              <AppTextInput
                label='Confirmar Contraseña'
                value={values.confirmPassword}
                onChangeText={(v) => setFieldValue('confirmPassword', v)}
                onBlur={() => handleBlur('confirmPassword')}
                errorText={(touched.confirmPassword && errors.confirmPassword) || ''}
                secureTextEntry
              />
              <Button mode='contained' onPress={() => handleSubmit()} style={{ marginBottom: 20 }}>
                Enviar
              </Button>
            </View>
          )}
        </Formik>
        <Button mode='text' onPress={() => navigation.navigate('Login')} style={{ justifyContent: 'center' }}>
          Ir al Inicio de Sesión
        </Button>
      </View>
    </Provider>
  );
}
