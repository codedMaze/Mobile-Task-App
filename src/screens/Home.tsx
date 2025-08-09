import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Confirm, TaskForm } from "@modal";
import { loadTasks, saveTasks } from "@store";
import { FilterTabs, Button } from "@ui";
import { StatusType } from "@constants";
import { Task } from "@types";
import { useTask } from "@/src/hooks";
import { TaskItem } from "../components/TaskItem";

export type RootStackParamList = {
  Home: undefined
  TaskDetail: { task: Task };
};

export const Home = () => {
  const [filter, setFilter] = useState<StatusType>("all");
  const [selected, setSelected] = useState<Task | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const { deleteTask, addOrUpdateTask, tasks, toggleTask } = useTask();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const filtered = tasks.filter((t) => filter === "all" || t.status === filter);

  const handleDelete = async () => {
    if (!selected) return;
    deleteTask(selected.id);
    setConfirmVisible(false);
    setSelected(null);
  };

  return (
    <View style={styles.container}>
      <View>
        <FilterTabs status={filter} onChange={setFilter} />
      </View>

      <View style={{ padding: 18, flex: 1 }}>
        <FlatList
          data={filtered}
          keyExtractor={(t) => t.id}
          renderItem={({ item }) => (
            <TaskItem
              key={item.id}
              task={item}
              onToggle={() => toggleTask(item.id)}
              onPress={() =>
                navigation.navigate("TaskDetail", {
                  task: item,
                })
              }
            />
          )}
        />
      </View>
      <View style={{ padding: 16, flexDirection: "row" }}>
        <Button title="Add Task" onPress={() => setEditModalVisible(true)} />
      </View>

      <TaskForm
        visible={editModalVisible}
        onClose={() => {
          setEditModalVisible(false);
          setSelected(null);
        }}
        onSubmit={addOrUpdateTask}
        initial={selected || undefined}
      />

      <Confirm
        visible={confirmVisible}
        onClose={() => setConfirmVisible(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this task?"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
