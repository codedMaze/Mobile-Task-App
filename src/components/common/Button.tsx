import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { colors } from "@constants";

export type Variant = "primary" | "success" | "error" | "warning";

type Props = {
  title: string;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  variant?: Variant;
};

const rippleColors = {
  primary: colors.primary600,
  success: colors.success600,
  error: colors.error600,
  warning: colors.warning500,
};

export const Button = ({ title, onPress, variant = "primary" }: Props) => {
  return (
    <View style={styles.btnOuterConatainer}>
      <Pressable
        style={({ pressed }) => [
          styles.btnInnercontainer,
          variantStyles[variant],
          pressed && styles.pressed,
        ]}
        onPress={onPress}
        android_ripple={{ color: rippleColors[variant] }}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnOuterConatainer: {
    margin: 4,
    borderRadius: 28,
    overflow: "hidden",
    flex: 1,
  },
  btnInnercontainer: {
    backgroundColor: colors.primary500,
    padding: 16,
    elevation: 2,
    shadowColor: "#CC9F00",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary500,
  },
  success: {
    backgroundColor: colors.success500,
  },
  error: {
    backgroundColor: colors.error500,
  },
  warning: {
    backgroundColor: colors.warning500,
  },
});
