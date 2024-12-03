import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

interface DateTimeSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      onDateChange(date);
    }
    setShowPicker(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.dateText}>
          {selectedDate.toLocaleDateString()} - {selectedDate.toLocaleTimeString().slice(0, 5)}Hs
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="datetime"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateInput: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: "#D9D9D966",
    marginBottom: 15,
  },
  dateText: {
    color: "#5C6D73",
    fontWeight: "600",
    fontSize: 12,
  },
});

export default DateTimeSelector;
