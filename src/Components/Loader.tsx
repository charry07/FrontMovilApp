// Loading.tsx
import React from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function Loader({ visible }: { visible: boolean }) {
  const { colors } = useTheme();

  return (
    <Modal transparent visible={visible}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <ActivityIndicator size='large' color={colors.primary} />
      </View>
    </Modal>
  );
}
