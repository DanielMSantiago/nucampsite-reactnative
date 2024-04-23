import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Switch,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Modal } from "react-native";

const ReservationScreen = () => {
  const [campers, setCampers] = useState(1);
  const [hikeIn, setHikeIn] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowCalendar(Platform.OS === "ios");
    setDate(currentDate);
  };

  const handleReservation = () => {
    console.log({ campers, hikeIn, date });
    setShowModal(!showModal);
    setCampers(1);
    setHikeIn(false);
    setDate(new Date());
    setShowCalendar(false);
  };

  const resetForm = () => {
    setCampers(1);
    setHikeIn(false);
    setDate(new Date());
    setShowCalendar(false);
  };

  return (
    <ScrollView>
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
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(!showModal)}
      >
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Search Campsite Reservations</Text>
          <Text style={styles.modalText}>Number of Campers: {campers}</Text>
          <Text style={styles.modalText}>
            Hike-In?: {hikeIn ? "Yes" : "No"}
          </Text>
          <Text style={styles.modalText}>
            Date: {date.toLocaleDateString("en-US")}
          </Text>
          <Button
            onPress={() => {
              setShowModal(!showModal);
              resetForm();
            }}
            color="#5637DD"
            title="Close"
          />
        </View>
      </Modal>

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
