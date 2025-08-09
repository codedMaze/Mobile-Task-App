import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "./Home";
import { Task } from "@types";
import { TaskForm } from "@modal";
import { StatusBadge, Button } from "@ui";
import { useTask } from "@/src/hooks";

type DetailRouteProp = RouteProp<RootStackParamList, "TaskDetail">;
type Nav = StackNavigationProp<RootStackParamList, "TaskDetail">;

interface Props {
  route: DetailRouteProp;
  navigation: Nav;
}

export const TaskDetailScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<Nav>();
  const { task: routeTask } = route.params;
  const { addOrUpdateTask, deleteTask, toggleTask, task } = useTask(
    routeTask.id
  );

  useEffect(() => {
    navigation.setOptions({ title: task.title });
  }, [task]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: routeTask.title,
      headerRight: () => (
        <Ionicons
          name="trash-outline"
          size={24}
          color="#ffb4b4"
          style={{ marginRight: 16 }}
          onPress={confirmDelete}
        />
      ),
    });
  }, [navigation]);

  const confirmDelete = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          handleDelete();
          navigation.goBack();
        },
      },
    ]);
  };

  const [editVisible, setEditVisible] = useState(false);

  const updateTask = async (updatedTask: Task) => {
    addOrUpdateTask(updatedTask);
    setEditVisible(false);
  };

  const handleDelete = async () => {
    deleteTask(task.id);
  };

  const handleComplete = async () => {
    toggleTask(task.id);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 28 }}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
        <StatusBadge status={task.status} />
      </View>

      <View style={{ gap: 18 }}>
        <View style={styles.buttons}>
          <Button
            title={
              task.status === "completed" ? "Mark Pending" : "Mark Completed"
            }
            variant={task.status === "completed" ? "warning" : "success"}
            onPress={handleComplete}
          />
        </View>
        <View style={styles.buttons}>
          <Button title="Edit" onPress={() => setEditVisible(true)} />
        </View>
      </View>

      <TaskForm
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        onSubmit={updateTask}
        initial={task}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  description: { fontSize: 16, marginBottom: 12 },
  status: { fontSize: 14, color: "#666", marginBottom: 20 },
  buttons: { gap: 10, flexDirection: "row" },
});
