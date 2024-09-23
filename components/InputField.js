import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const InputField = ({
  placeholder,
  label,
  req,
  val,
  onChangeText,
  keyboardType,
  multiline,
}) => {
  return (
    <View>
      {label && (
        <Text style={{ fontFamily: "Poppins-Regular", fontSize: 14 }}>
          {label}
          {req && <Text style={{ color: "red" }}>*</Text>}
        </Text>
      )}
      <TextInput
        value={val}
        multiline={multiline}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType ? keyboardType : "text"}
        style={{
          paddingVertical: 5,
          paddingHorizontal: 10,
          height: multiline ? 80 : 40,
          borderWidth: 1,
          borderRadius: 5,
          width: 423,
        }}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({});
