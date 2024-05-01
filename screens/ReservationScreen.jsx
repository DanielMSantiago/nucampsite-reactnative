import React, { useState, useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Switch,
  Button,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Animatable from "react-native-animatable";
import * as Notifications from "expo-notifications";

const ReservationScreen = () => {
  const [campers, setCampers] = useState(1);
  const [hikeIn, setHikeIn] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const view = useRef();

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowCalendar(Platform.OS === "ios");
    setDate(currentDate);
  };

  const handleReservation = () => {
    console.log({ campers, hikeIn, date });
    Alert.alert(
      "Begin Search?",
      `Number of Campers: ${campers}\nHike In? ${hikeIn}\nDate: ${date.toLocaleDateString(
        "en-us"
      )}`,
      [
        {
          text: "Cancel",
          style: "cancel",

          onPress: () => resetForm(),
        },
        {
          text: "OK",
          onPress: () => {
            presentLocalNotification(date.toLocaleDateString("en-US"));
            resetForm();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const resetForm = () => {
    setCampers(1);
    setHikeIn(false);
    setDate(new Date());
    setShowCalendar(false);
  };

  const presentLocalNotification = async (reservationDate) => {
    const sendNotification = () => {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Your Campsite Reservation Search",
          body: `Search for ${reservationDate} requested`,
        },
        trigger: null,
      });
    };
    let permissions = await Notifications.getPermissionsAsync();

    if (!permissions.granted) {
      permissions = await Notifications.requestPermissionsAsync();
    }

    if (permissions.granted) {
      sendNotification();
    }
  };

  return (
    <ScrollView>
      <Animatable.View
        animation="zoomIn"
        duration={2000}
        delay={1000}
        ref={view}
      >
        <View style={styles.formRow}>
          <Text style={styles.formLabels}>Number of Campers:</Text>

          <Picker
            style={styles.formItem}
            selectedValue={campers}
            onValueChange={(itemValue) => setCampers(itemValue)}
          >
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />
            <Picker.Item label="5" value={5} />
            <Picker.Item label="6" value={6} />
          </Picker>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.formLabels}>
            Hike In?
            <Switch
              style={styles.formItem}
              value={hikeIn}
              trackColor={{ true: "#5637dd", false: null }}
              onValueChange={(value) => setHikeIn(value)}
            />
          </Text>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.formLabels}>Date:</Text>
          <Button
            onPress={() => setShowCalendar(true)}
            title={date.toLocaleDateString("en-US")}
            color="#5637DD"
            accessibilityLabel="Tap Me to Select Reservation Date"
          />
        </View>

        {showCalendar && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        <Button
          onPress={handleReservation}
          title="Search Availability"
          color="#5637dd"
          accessibilityLabel="Tap me to Search for Available Campsites to Reserve"
        />
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    margin: 20,
  },
  formLabels: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#5637DD",
    textAlign: "center",
    color: "#fff",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});

export default ReservationScreen;
