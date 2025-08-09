import React from "react";
import { Controller, Control, FieldError } from "react-hook-form";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  StyleProp,
  TextStyle,
  TextInputProps,
} from "react-native";

type Props = {
  name: string;
  control: Control<any>;
  placeholder?: string;
  error?: string;
  style?: StyleProp<TextStyle>;
  label?: string;
} & TextInputProps;

export const Input: React.FC<Props> = ({
  name,
  control,
  placeholder,
  error,
  style,
  label,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <View style={styles.container}>
          {label && (
            <View style={{ marginBottom: 12 }}>
              <Text>{label}</Text>
            </View>
          )}
          <TextInput
            style={[styles.input, style, error && styles.inputError]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            {...rest}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#e63946",
  },
  errorText: {
    color: "#e63946",
    fontSize: 13,
    marginTop: 4,
  },
});
