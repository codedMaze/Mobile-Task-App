import React from "react";
import { View, StyleSheet, Text } from "react-native";
import type { TaskStatus } from "@types";
import { colors } from "@constants";

interface Props {
  status: TaskStatus;
}

export const StatusBadge: React.FC<Props> = ({ status }) => {
  const isCompleted = status === "completed";
  return (
    <View
      style={[styles.badge, isCompleted ? styles.completed : styles.pending]}
    >
      <Text style={styles.text}>{isCompleted ? "Completed" : "Pending"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  completed: {
    backgroundColor: colors.success600,
  },
  pending: {
    backgroundColor: colors.warning600,
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
});
