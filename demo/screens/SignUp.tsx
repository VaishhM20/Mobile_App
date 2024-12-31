import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

const SignUp = ({ navigation }: any) => {
  const [passwordStrength, setPasswordStrength] = useState("Weak");

  const checkPasswordStrength = (password: string) => {
    if (password.length > 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      setPasswordStrength("Strong");
    } else if (password.length > 6) {
      setPasswordStrength("Moderate");
    } else {
      setPasswordStrength("Weak");
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(4, "Password too short").required("Password is required"),
      })}
      onSubmit={(values) => alert("Sign Up Successful")}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            keyboardType="email-address"
            accessibilityLabel="Email input field"
            accessibilityHint="Enter your email address"
          />
          {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              handleChange("password")(text);
              checkPasswordStrength(text);
            }}
            onBlur={handleBlur("password")}
            value={values.password}
            secureTextEntry
            accessibilityLabel="Password input field"
            accessibilityHint="Enter your password"
          />
          {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
          <Text>Password Strength: {passwordStrength}</Text>

          <Button title="Sign Up" onPress={() => handleSubmit()} />
          <Button title="Go to Login" onPress={() => navigation.navigate("Login")} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default SignUp;
