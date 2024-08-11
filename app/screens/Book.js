import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { StyleSheet, Button } from "react-native";
import colors from "../config/colors";

const BookingSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    // Generate available dates for BeatSubscription (2 times/week, 1 month ahead)
    const generateAvailableDates = () => {
      const dates = [];
      const today = new Date();
      const oneMonthAhead = new Date(today);
      oneMonthAhead.setMonth(today.getMonth() + 1);

      for (
        let d = new Date(today);
        d <= oneMonthAhead;
        d.setDate(d.getDate() + 1)
      ) {
        if (d.getDay() === 1 || d.getDay() === 3) {
          // Monday and Wednesday
          dates.push(new Date(d));
        }
      }
      setAvailableDates(dates);
    };

    generateAvailableDates();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  // Function to inject messages into the message container
  const showMessage = (message) => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.innerText = message;
      messageContainer.style.display = "block"; // Ensure the container is visible
    }
  };

  // Function to generate receipt content
  const generateReceiptContent = () => {
    return `Tack för din Bokning !\n\nDamrec productions\nhttps://damrec.se\n\Skirebo Göransberg 1\n564 91 Bankeryd\nTelefon: 0702072725\n\nBooking Receipt\n\nService: ${selectedService}\nDate: ${selectedDate.toDateString()}\nName: ${name}\nPhone Number: ${phoneNumber}\nEmail: ${email}\nComments: ${comments}`;
  };

  const downloadReceipt = (content) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "booking_receipt.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedService || !name || !phoneNumber || !email) {
      showMessage("Please fill in all required fields.");
      return;
    }

    if (
      selectedService === "BeatSubscription" &&
      !availableDates.some(
        (date) => date.toDateString() === selectedDate.toDateString()
      )
    ) {
      showMessage("BeatSubscription can only be booked on available dates.");
      return;
    }

    const confirmationMessage = `Booking request confirmed for ${selectedService} on ${selectedDate.toDateString()} 
    We will contact you soon on ${email} or ${phoneNumber} to let you know if the selected date is available.`;
    showMessage(confirmationMessage);

    const receiptContent = generateReceiptContent();
    downloadReceipt(receiptContent);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.booking}>Booking Schedule</h2>
      <div style={styles.form}>
        <DatePicker
          style={styles.select}
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
          filterDate={(date) => {
            if (selectedService === "BeatSubscription") {
              return availableDates.some(
                (d) => d.toDateString() === date.toDateString()
              );
            }
            return true;
          }}
          placeholderText="Select a date"
        />
        <select
          style={styles.select}
          value={selectedService}
          onChange={handleServiceChange}
        >
          <option value="">Select a service</option>
          <option value="Möhippa/Svensexa">Möhippa/Svensexa</option>
          <option value="Inspelning">Inspelning</option>
          <option value="BeatSubscription">BeatSubscription</option>
        </select>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
          style={styles.input}
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="Phone Number"
          style={styles.input}
        />
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          style={styles.input}
        />
        <textarea
          value={comments}
          onChange={handleCommentsChange}
          placeholder="Comments"
          style={styles.textarea}
        />
      </div>
      <div style={styles.buttonRow}>
        <Button
          style={styles.singleBtn}
          color="#2425ff"
          title="Book"
          onPress={handleBooking}
        />
      </div>
      <div id="message-container" style={styles.messageContainer}></div>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundImage:
      "url('https://webgradients.com/public/webgradients_png/022%20Morpheus%20Den.png')",
    borderColor: colors.secondary,
    borderRadius: 5,
    borderWidth: 5,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Bruno Ace SC",
  },
  messageContainer: {
    color: "white",
    display: "block",
    margin: 34,
    display: "none",
    borderWidth: 20,
    borderColor: "#1241ff",
    borderStyle: "dotted",
    padding: 26,
  },
  singleBtn: {
    shadowColor: "black",
    width: 300,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    margin: 10,
  },
  select: {
    width: "80%",
    height: 40,
    fontFamily: "Bruno Ace SC",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  buttonRow: {
    width: "80%",
    display: "flex",
    justifyContent: "center",
  },
  form: {
    color: "white",
    fontsize: 16,
    fontfamily: "Bruno Ace SC",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fadingContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.secondary,
    bottom: 70,
    width: 400,
    height: 500,
  },
  fadingText: {
    fontSize: 28,
    textAlign: "center",
    margin: 10,
    color: "white",
  },
  buttonRow: {
    flexDirection: "row",
    marginVertical: 16,
  },
  button: {
    padding: 20,
    borderRadius: 5,
    margin: 10,
    backgroundColor: "blue",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontFamily: "Bruno Ace SC",
  },
  icons: {
    display: "grid",
    justifyContent: "top",
    position: "relative",
    left: 170,
    bottom: 50,
    margin: 10,
  },
  input: {
    width: "80%",
    height: 40,
    fontFamily: "Bruno Ace SC",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  booking: {
    width: 80,
    height: 80,
    fontfamily: "Bruno Ace SC",
    bordercolor: "gray",
    borderwidth: 1,
    marginbottom: 10,
    paddingleft: 8,
    display: "block",
    color: "white",
  },
  textarea: {
    width: "80%",
    height: 80,
    fontFamily: "Bruno Ace SC !important",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  scrollView: {
    marginHorizontal: 20,
    marginVertical: 40,
  },
  text: {
    color: "gray",
    fontSize: 16,
    fontFamily: "Bruno Ace SC",
  },
});

export default BookingSchedule;
