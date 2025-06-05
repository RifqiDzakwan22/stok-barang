import { Image } from "expo-image";
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
   const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // Logika login nanti di sini
    if (username && password) {
      router.replace('/inventory');
       } else {
      alert('Username dan password wajib diisi!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Ilustrasi atas */}
      <Image
        source={require("@/assets/images/undraw.svg")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Logo Stockflow */}
      <Image
        source={require("@/assets/images/stockflow-logo.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Text info */}
      <Text style={styles.loginInfoText}>Silahkan login terlebih dahulu.</Text>

      {/* Input Username */}
      <View style={styles.inputContainer}>
        <Text style={styles.icon}>👤</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>

      {/* Input Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.icon}>🔒</Text>
        <TextInput
          style={styles.input}
          placeholder="***************"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>

      {/* Tombol Sign In */}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign in!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    width: 280,
    height: 160,
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0033FF", // warna biru
    marginBottom: 12,
  },
  loginInfoText: {
    fontSize: 12,
    color: "#222",
    alignSelf: "flex-start",
    marginBottom: 8,
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E2E2E2",
    borderRadius: 6,
    width: "100%",
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  icon: {
    fontSize: 18,
    color: "#444",
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 42,
    fontSize: 14,
    color: "#000",
  },
  button: {
    backgroundColor: "#0033FF",
    width: "100%",
    height: 42,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
