import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";

import { validateUserName } from "./util/util";
import Dropdown from "./components/Dropdown";

export default function App() {
  const [accountType, setAccountType] = useState("Advanced");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [serverAddress, setServerAddress] = useState("");
  const [serverPath, setServerPath] = useState("");
  const [port, setPort] = useState("");

  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverAddressError, setServerAddressError] = useState("");
  const [serverPathError, setServerPathError] = useState("");
  const [portError, setPortError] = useState("");

  const [isChecked, setIsChecked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = () => {
    //const isValidUserName = validateUserName(userName);
    // if (!isValidUserName) {
    //   setUserNameError("Invalid User Name");
    // }
  };

  const checkDefaultMandatoryFields =
    userName === "" || password === "" || serverAddress === "";

  const isButtonDisabled = () => {
    return accountType === "Advanced"
      ? checkDefaultMandatoryFields ||
          serverPath === "" ||
          port === "" ||
          !isChecked
      : checkDefaultMandatoryFields;
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Account Type:</Text>
        <TextInput
          style={styles.textInput}
          editable={false}
          value={accountType}
          onPressIn={() => setIsDropdownOpen(!isDropdownOpen)}
        />
        <Pressable
          style={{
            position: "absolute",
            backgroundColor: "red",
            right: 5,
            borderRadius: 8,
          }}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Ionicons name="chevron-expand" size={22} color="white" />
        </Pressable>
        {isDropdownOpen && (
          <Dropdown
            setAccountType={setAccountType}
            setIsDropdownOpen={setIsDropdownOpen}
          />
        )}
      </View>
      <View
        style={{
          alignItems: "center",
          zIndex: -10,
        }}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>User Name:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="name@example.com"
            value={userName}
            onChangeText={setUserName}
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password: </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Required"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Server Address: </Text>
        <TextInput
          style={styles.textInput}
          placeholder="example.com"
          value={serverAddress}
          onChangeText={setServerAddress}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Server Path: </Text>
        <TextInput
          style={styles.textInput}
          placeholder="/calendars/user/"
          value={serverPath}
          onChangeText={setServerPath}
          autoCapitalize="none"
        />
      </View>
      <View
        style={{
          ...styles.inputContainer,
          justifyContent: "flex-start",
        }}
      >
        <Text style={styles.inputLabel}>Port: </Text>
        <View
          style={{
            width: "70%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            style={{
              ...styles.textInput,
              width: 100,
            }}
            value={port}
            onChangeText={setPort}
            keyboardType="numeric"
          />
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            color={!isChecked ? "#000" : "red"}
            style={{
              marginLeft: 30,
            }}
          />

          <Text style={{ marginLeft: 10 }}>Use SSL</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: "100%",
          height: 40,
          backgroundColor: isButtonDisabled() ? "gray" : "green",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          marginTop: 30,
        }}
        disabled={isButtonDisabled()}
        onPress={handleSubmit}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    zIndex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    zIndex: -1,
  },
  inputLabel: {
    textAlign: "right",
    width: "30%",
    marginRight: 10,
    zIndex: -1,
  },
  textInput: {
    width: "70%",
    backgroundColor: "#fff",
    marginLeft: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    zIndex: -1,
  },
});
