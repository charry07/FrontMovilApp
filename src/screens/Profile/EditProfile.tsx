// // src/screens/Profile.tsx
// import React, { useContext } from 'react';
// import { View } from 'react-native';
// import { Avatar, Title, Caption, Paragraph, Text, TouchableRipple, Button } from 'react-native-paper';
// import api from '../../api';
// import { AuthContext } from '../../../App';

// export default function Profile({ navigation }: any) {
//   const user: any = useContext(AuthContext)?.user;

//   console.log(useContext(AuthContext)?.user);

//   return (
//     <View
//       style={{
//         flex: 1,
//         padding: 20,
//         justifyContent: 'center',
//         backgroundColor: '#f5f5f5',
//       }}>
//       <Avatar.Image
//         source={{
//           uri: user.avatar || 'https://www.example.com/path/to/avatar.jpg',
//         }}
//         size={80}
//       />
//       <Title style={{ marginTop: 15, textAlign: 'center' }}>{user.username || 'Nombre de Usuario'}</Title>
//       <Caption style={{ textAlign: 'center' }}>{user.email || 'usuario@example.com'}</Caption>
//       <Paragraph style={{ marginTop: 20, textAlign: 'center' }}>Aquí puedes editar tu perfil y configurar tus preferencias.</Paragraph>
//       <Button mode='contained' onPress={() => navigation.navigate('EditProfile')} style={{ marginTop: 20 }}>
//         Editar Perfil
//       </Button>
//     </View>
//   );
// }

//aqui va la pantall de edit profile para editar la constrasena email y username

// src/screens/Profile/EditProfile.tsx
import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AppTextInput } from '../../Components/index';
import api from '../../api';
import Loader from '../../Components/Loader';
import { AuthContext } from '../../../App';

const EditProfileSchema = Yup.object().shape({
  username: Yup.string().min(2, '¡Demasiado corto!').max(50, '¡Demasiado largo!').required('Requerido'),
  email: Yup.string().email('¡Debe ser un correo electrónico válido!').min(2, '¡Demasiado corto!').max(50, '¡Demasiado largo!').required('Requerido'),
  password: Yup.string().min(2, '¡Demasiado corto!').max(50, '¡Demasiado largo!').required('Requerido'),
  firstName: Yup.string().min(2, '¡Demasiado corto!').max(50, '¡Demasiado largo!'),
  lastName: Yup.string().min(2, '¡Demasiado corto!').max(50, '¡Demasiado largo!'),
  birthDate: Yup.date(),
  phoneNumber: Yup.string().min(2, '¡Demasiado corto!').max(15, '¡Demasiado largo!'),
});

export default function EditProfile({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const authContext: any = useContext(AuthContext);
  const user: any = JSON.parse(localStorage.getItem('user') as any);

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Loader visible={isLoading} />
      <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>Editar Perfil</Text>
      <Formik
        initialValues={{
          email: user.email,
          password: '',
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          birthDate: user.birthDate,
          phoneNumber: user.phoneNumber,
        }}
        validationSchema={EditProfileSchema}
        onSubmit={async (values) => {
          setIsLoading(true);
          const userUpdated = await api.put(`/users/${user?.id}`, values);
          authContext.setUser(await userUpdated.data);
          localStorage.setItem('user', JSON.stringify(userUpdated.data));
          navigation.navigate('Profile');
          setIsLoading(false);
        }}>
        {({ setFieldValue, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <AppTextInput
              label='Email'
              disabled
              value={values.email}
              onChangeText={(v) => setFieldValue('email', v)}
              onBlur={() => handleBlur('email')}
              errorText={(touched.email && (errors.email as any)) || ''}
            />
            <AppTextInput
              label='Nombre de Usuario'
              value={values.username}
              onChangeText={(v) => setFieldValue('username', v)}
              onBlur={() => handleBlur('username')}
              errorText={(touched.username && (errors.username as any)) || ''}
            />
            <AppTextInput
              label='Nombre'
              value={values.firstName}
              onChangeText={(v) => setFieldValue('firstName', v)}
              onBlur={() => handleBlur('firstName')}
              errorText={(touched.firstName && (errors.firstName as any)) || ''}
            />
            <AppTextInput
              label='Apellido'
              value={values.lastName}
              onChangeText={(v) => setFieldValue('lastName', v)}
              onBlur={() => handleBlur('lastName')}
              errorText={(touched.lastName && (errors.lastName as any)) || ''}
            />
            <AppTextInput
              label='Fecha de Nacimiento'
              value={values.birthDate}
              onChangeText={(v) => setFieldValue('birthDate', v)}
              onBlur={() => handleBlur('birthDate')}
              errorText={(touched.birthDate && (errors.birthDate as any)) || ''}
            />
            <AppTextInput
              label='Número de Teléfono'
              value={values.phoneNumber}
              onChangeText={(v) => setFieldValue('phoneNumber', v)}
              onBlur={() => handleBlur('phoneNumber')}
              errorText={(touched.phoneNumber && (errors.phoneNumber as any)) || ''}
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
          </View>
        )}
      </Formik>
    </View>
  );
}
