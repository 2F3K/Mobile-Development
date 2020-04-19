import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainscreen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listBox: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "black",
  },
  row: {
    flexDirection: "row",
    padding: 20,
    borderWidth: 1,
    alignItems: "center",
    alignContent: "center",
  },
  title: {
    padding: 15,
    backgroundColor: "black",
    color: "white",
    marginBottom: 20,
    alignContent: "center",
    alignItems: "center",
  },
  customplaybutton: {
    borderRadius: 50,
    height: 100,
    width: 100,
    backgroundColor: "green",
    alignItems: "center",
    alignContent: "center",
  },
  playicon: {
    color: "white",
    padding: 20,
    fontSize: 40,
  },
  customstopbutton: {
    borderRadius: 30,
    height: 100,
    width: 100,
    backgroundColor: "red",
    alignItems: "center",
    alignContent: "center",
  },
  stopicon: { color: "white", padding: 20, fontSize: 40 },
  audioscreen: {
    flex: 1,
    backgroundColor: "black",
    color: "white",
    alignItems: "center",
    alignContent: "center",
  },
});
