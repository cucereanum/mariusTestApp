import { useState } from "react";
import {
  Alert,
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

const Colors = {
  error: "#ff0000",
  success: "green",
  gray: "#ccc",
};

export default function App() {
  const [accountType, setAccountType] = useState("Advanced");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [serverAddress, setServerAddress] = useState("");
  const [serverPath, setServerPath] = useState("");
  const [port, setPort] = useState("");

  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [serverAddressError, setServerAddressError] = useState(false);
  const [serverPathError, setServerPathError] = useState(false);
  const [portError, setPortError] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = () => {
    clearErrors();
    let checkErrors = checkInputsValidation();

    if (checkErrors) {
      return;
    }

    const successManualMessage = `User Name: ${userName} \n
    Password: ${password} \n
    Server Address: ${serverAddress} 
    \nAccount Type: ${accountType}`;

    const successAdvancedMessage = `User Name: ${userName} \n
    Password: ${password} \n
    Server Address: ${serverAddress} 
    \nAccount Type: ${accountType} \n
    Server Path: ${serverPath} \n
    Port: ${port} \n
    Use SSL: ${isChecked}`;

    const displayMessage =
      accountType === "Advanced"
        ? successAdvancedMessage
        : successManualMessage;

    Alert.alert("Success", displayMessage);
    clearAllFields();
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

  const clearErrors = () => {
    setUserNameError(false);
    setPasswordError(false);
    setServerAddressError(false);
    setServerPathError(false);
    setPortError(false);
  };

  const clearAllFields = () => {
    setUserName("");
    setPassword("");
    setServerAddress("");
    setServerPath("");
    setPort("");
    setIsChecked(false);
    setAccountType("Advanced");
    clearErrors();
  };

  const checkInputsValidation = () => {
    let checkErrors = false;
    if (userName.trim() === "") {
      setUserNameError("User name is required");
      checkErrors = true;
    } else if (!validateUserName(userName)) {
      setUserNameError("Invalid user name");
      checkErrors = true;
    }
    if (password.trim() === "") {
      setPasswordError("Password is required");
      checkErrors = true;
    } else if (password.trim().length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      checkErrors = true;
    }
    if (serverAddress.trim() === "") {
      setServerAddressError("Server address is required");
      checkErrors = true;
    } else if (!serverAddress.includes(".")) {
      setServerAddressError("Invalid server address");
      checkErrors = true;
    }
    if (accountType === "Advanced") {
      if (serverPath.trim() === "") {
        setServerPathError("Server path is required");
        checkErrors = true;
      }
      if (!serverPath.startsWith("/")) {
        setServerPathError("Invalid server path");
        checkErrors = true;
      }
      if (port.trim() === "") {
        setPortError("Port is required");
        checkErrors = true;
      } else if (isNaN(port) || port.length !== 4) {
        setPortError("Port must be a number with 4 digits long");
        checkErrors = true;
      }
    }

    return checkErrors;
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
            backgroundColor: Colors.error,
            right: 5,
            borderRadius: 8,
          }}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Ionicons name="chevron-expand" size={22} color="white" />
        </Pressable>
        {isDropdownOpen && (
          <Dropdown
            accountType={accountType}
            setAccountType={setAccountType}
            setIsDropdownOpen={setIsDropdownOpen}
            clearErrors={clearErrors}
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
            style={{
              ...styles.textInput,
              borderWidth: userNameError ? 3 : 1,
              borderColor: userNameError ? Colors.error : Colors.gray,
            }}
            placeholder="name@example.com"
            value={userName}
            onChangeText={setUserName}
            autoCorrect={false}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {userNameError && <Text style={styles.error}>{userNameError}</Text>}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password: </Text>
          <TextInput
            style={{
              ...styles.textInput,
              borderWidth: passwordError ? 3 : 1,
              borderColor: passwordError ? Colors.error : Colors.gray,
            }}
            placeholder="Required"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        {passwordError && (
          <Text
            style={{
              ...styles.error,
              left: 60,
            }}
          >
            {passwordError}
          </Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Server Address: </Text>
        <TextInput
          style={{
            ...styles.textInput,
            borderWidth: serverAddressError ? 3 : 1,
            borderColor: serverAddressError ? Colors.error : Colors.gray,
          }}
          autoCapitalize="none"
          placeholder="example.com"
          value={serverAddress}
          onChangeText={setServerAddress}
        />
      </View>
      {serverAddressError && (
        <Text
          style={{
            ...styles.error,
            left: 0,
          }}
        >
          {serverAddressError}
        </Text>
      )}
      {accountType === "Advanced" && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Server Path: </Text>
            <TextInput
              style={{
                ...styles.textInput,
                borderWidth: serverPathError ? 3 : 1,
                borderColor: serverPathError ? Colors.error : Colors.gray,
              }}
              placeholder="/calendars/user/"
              value={serverPath}
              onChangeText={setServerPath}
              autoCapitalize="none"
            />
          </View>
          {serverPathError && (
            <Text
              style={{
                ...styles.error,
                left: -10,
              }}
            >
              {serverPathError}
            </Text>
          )}
          <View
            style={{
              ...styles.inputContainer,
              justifyContent: "flex-start",
            }}
          >
            <Text style={styles.inputLabel}>Port: </Text>
            <View style={styles.checkboxContainer}>
              <TextInput
                style={{
                  ...styles.textInput,
                  width: 100,
                  borderWidth: portError ? 3 : 1,
                  borderColor: portError ? Colors.error : Colors.gray,
                }}
                value={port}
                onChangeText={setPort}
                keyboardType="numeric"
              />
              <Checkbox
                value={isChecked}
                onValueChange={setIsChecked}
                color={!isChecked ? "#000" : Colors.error}
                style={{
                  marginLeft: 30,
                }}
              />

              <Text style={{ marginLeft: 10 }}>Use SSL</Text>
            </View>
          </View>
          {portError && (
            <Text
              style={{
                ...styles.error,
                left: 50,
              }}
            >
              {portError}
            </Text>
          )}
        </>
      )}
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: isButtonDisabled() ? "gray" : Colors.success,
        }}
        disabled={isButtonDisabled()}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonLabel}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 30,
  },
  buttonLabel: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    zIndex: 1,
  },
  checkboxContainer: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
  },
  error: {
    color: Colors.error,
    marginBottom: 10,
    left: -10,
    fontStyle: "italic",
    fontSize: 12,
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
    fontWeight: "bold",
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
    borderColor: Colors.gray,
    zIndex: -1,
  },
});
