import React, { useRef } from "react";
import {
  View,
  Alert,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import { CameraView } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../../src/styles/QrCodeScannerScreenStyle";

export default function QRCodeScannerScreen() {
  const qrLock = useRef(false);
  const navigation = useNavigation();

  const handleBarcodeScanned = ({ data }) => {
    if (data && !qrLock.current) {
      qrLock.current = true; // Verrouille le scanner
      Alert.alert("QR Code Scanné", `Données : ${data}`, [
        {
          text: "OK",
          onPress: () => {
            qrLock.current = false; // Réactive le scanner
          },
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back" // Utilise la caméra arrière
        onBarcodeScanned={handleBarcodeScanned}
      />

      {/* Overlay */}
      <View style={styles.overlayContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.scanFrame} />
        <Text style={styles.overlayText}>Placez le QR code dans le cadre</Text>
      </View>
    </SafeAreaView>
  );
}
