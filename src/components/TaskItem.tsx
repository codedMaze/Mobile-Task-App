import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Task } from "@types";
import { Feather } from "@expo/vector-icons";
import { BodyText, Title } from "@ui";
import { colors } from "@constants";

interface Props {
  task: Task;
  onPress: () => void;
  onToggle: () => void;
}

export const TaskItem: React.FC<Props> = ({ task, onPress, onToggle }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.row}>
      <TouchableOpacity onPress={onToggle}>
        <Feather
          name={task.status === "completed" ? "check-circle" : "circle"}
          size={22}
          color={task.status === "completed" ? colors.success600 : "#aaa"}
        />
      </TouchableOpacity>
      <View style={styles.textWrapper}>
        <Title
          style={[
            styles.title,
            task.status === "completed" && {
              textDecorationLine: "line-through",
              color: "#999",
            },
          ]}
        >
          {task.title}
        </Title>
        <BodyText
          style={styles.description}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {task.description}
        </BodyText>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    padding: 14,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  textWrapper: {
    marginHorizontal: 12,
  },
  title: {
    flex: 1,
    color: "#201c1c",
  },
  description: {
    color: "#6b7280",
    marginTop: 4,
  },
});
