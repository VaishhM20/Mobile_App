import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }: any) => {
  const [savedEmail, setSavedEmail] = useState<string | null>(null);

  useEffect(() => {
    const loadSavedEmail = async () => {
      const email = await AsyncStorage.getItem("rememberedEmail");
      if (email) {
        setSavedEmail(email);
      }
    };
    loadSavedEmail();
  }, []);

  const handleLogin = async (values: { email: string; password: string; rememberMe: boolean }) => {
    if (values.rememberMe) {
      await AsyncStorage.setItem("rememberedEmail", values.email);
    } else {
      await AsyncStorage.removeItem("rememberedEmail");
    }
    alert("Login Successful");
  };

  return (
    <Formik
      initialValues={{ email: savedEmail || "", password: "", rememberMe: savedEmail ? true : false }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().required("Password is required"),
      })}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
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
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            secureTextEntry
            accessibilityLabel="Password input field"
            accessibilityHint="Enter your password"
          />
          {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

          <CheckBox
            title="Remember Me"
            checked={values.rememberMe}
            onPress={() => setFieldValue("rememberMe", !values.rememberMe)}
            accessibilityLabel="Remember me checkbox"
            accessibilityHint="Check this box to save your email address for future logins"
          />

          <Button title="Login" onPress={() => handleSubmit()} />
          <Button title="Go to Sign Up" onPress={() => navigation.navigate("SignUp")} />
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

export default Login;
