import { TextProps, Text as Tx } from "react-native";
import React from "react";


export const Title = ({ style, ...rest }: TextProps) => {
  return (
    <Tx
      style={[
        {
          fontSize: 20,
          borderColor: "white",
          color: "white",
          fontWeight: "bold",
        },
        style,
      ]}
      {...rest}
    />
  );
};

export const BodyText = ({ style, ...rest }: TextProps) => {
  return (
    <Tx
      style={[
        {
          fontWeight: "400",
          fontSize: 14,
        },
        style,
      ]}
      {...rest}
    />
  );
};
