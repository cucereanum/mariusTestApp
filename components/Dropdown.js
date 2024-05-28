import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const Dropdown = ({ setAccountType, setIsDropdownOpen }) => {
  return (
    <View style={styles.dropdownContainer}>
      <Pressable
        style={styles.dropdownItem}
        onPress={() => {
          setAccountType("Advanced");
          setIsDropdownOpen(false);
        }}
      >
        <Text style={styles.dropdownItemLabel}>Advanced</Text>
      </Pressable>
      <Pressable
        style={{
          zIndex: 2,
          width: "100%",
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
        onPress={() => {
          setAccountType("Manual");
          setIsDropdownOpen(false);
        }}
      >
        <Text style={styles.dropdownItemLabel}>Manual</Text>
      </Pressable>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  dropdownContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "70%",
    top: 30,
    zIndex: 33,
    left: "34%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    borderRadius: 10,
    shadowOpacity: 0.25,
  },
  dropdownItem: {
    zIndex: 2,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dropdownItemLabel: {
    fontWeight: "500",
  },
});
