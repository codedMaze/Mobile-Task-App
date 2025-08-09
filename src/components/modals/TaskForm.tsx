import React, { useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Task } from "@types";
import { Button, Input } from "@ui";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  initial?: Task;
}

const schema = yup.object().shape({
  title: yup.string().trim().required("Title is required"),
  description: yup.string().trim().required("Description is required"),
});

type FormData = yup.InferType<typeof schema>;

export const TaskForm: React.FC<Props> = ({
  visible,
  onClose,
  onSubmit,
  initial,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (initial) {
      reset({
        title: initial.title,
        description: initial.description,
      });
    } else {
      reset({
        title: "",
        description: "",
      });
    }
  }, [initial, visible]);

  const submitForm = (data: FormData) => {
    const newTask: Task = {
      id: initial?.id || Date.now().toString(),
      title: data.title,
      description: data.description,
      status: initial?.status || "pending",
      createdAt: Date.now().toString(),
    };
    onSubmit(newTask);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.heading}>
              {initial ? "Edit Task" : "New Task"}
            </Text>

            <Input
              label="Title"
              name="title"
              control={control}
              placeholder="Enter title"
              error={errors.title?.message}
            />
            <Input
              label="Description"
              name="description"
              placeholder="Enter description"
              multiline={true}
              numberOfLines={4}
              control={control}
              error={errors.description?.message}
              style={{ minHeight: 100 }}
            />

            <View style={styles.actions}>
              <Button title="Cancel" onPress={onClose} variant="error" />
              <Button
                title={initial ? "Update Task" : "Create Task"}
                onPress={handleSubmit(submitForm)}
                variant="success"
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    gap: 12,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 12,
  },
});
