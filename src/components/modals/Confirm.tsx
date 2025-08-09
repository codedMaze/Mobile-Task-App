import React from "react";
import { Modal, View, Text, StyleSheet, Button } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export const Confirm: React.FC<Props> = ({
  visible,
  onClose,
  onConfirm,
  message,
}) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.actions}>
          <Button title="Cancel" onPress={onClose} />
          <Button title="Delete" onPress={onConfirm} color="#e63946" />
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
