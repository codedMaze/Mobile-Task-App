import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { StatusType, status as allStatus, colors } from "@constants";

interface Props {
  status: StatusType;
  onChange: (status: StatusType) => void;
}

export const FilterTabs: React.FC<Props> = ({ status, onChange }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {allStatus.map((s) => (
          <View key={s}>
            <TouchableOpacity
              onPress={() => onChange(s as StatusType)}
              style={[styles.tab, status === s && styles.activeTab]}
            >
              <Text style={[styles.text, status === s && styles.active]}>
                {s.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 10, padding: 16 },
  tab: {
    borderRadius: 20,
    backgroundColor: "#eee",
    paddingHorizontal: 30,
    paddingVertical: 8,
  },
  activeTab: {
    backgroundColor: colors.primary500,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
  },
  active: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
