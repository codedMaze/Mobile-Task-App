import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, RootStackParamList, TaskDetailScreen } from "@screens";
import { colors } from "@constants";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => (
  <>
    <StatusBar style="light" />
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: "slide_from_right",
          headerStyle: { backgroundColor: colors.primary700 },
          headerTintColor: "#fff",
          contentStyle: { backgroundColor: colors.primary200 },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </>
);

export default App;
