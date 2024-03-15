import React from 'react';
import { TextInput, Text } from 'react-native-paper';

interface AppTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  errorText?: string | undefined;
  secureTextEntry?: boolean;
  onBlur?: () => void;
  disabled?: boolean;
}

const AppTextInput: React.FC<AppTextInputProps> = (props) => {
  return (
    <>
      <TextInput
        {...props}
        secureTextEntry={props.secureTextEntry}
        onBlur={props.onBlur}
        label={props.label}
        value={props.value}
        onChangeText={props.onChangeText}
        disabled={props.disabled}
        style={{ marginBottom: 10 }}
      />
      {props.errorText && <Text style={{ color: 'red', fontSize: 12, marginLeft: 5, marginBottom: 5 }}>{props.errorText}</Text>}
    </>
  );
};

export default AppTextInput;