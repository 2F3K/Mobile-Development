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
  List: {
    padding: 4,
    margin: 4,
    alignContent: "center",
    width: "90%",
    minWidth: "90%",
  },
  inputText: {
    borderWidth: 1,
    borderColor: "blue",
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 10,
    margin: 5,
  },
  listItemRow: {
    position: "relative",
    padding: 12,
    margin: 4,
    height: 40,
    backgroundColor: "rgba(100,100,100, 0.25)",
  },

  listItemCheckbox: { width: 20, height: 20 },

  listItemName: {
    overflow: "hidden",
  },
  listContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    marginVertical: 10,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    borderWidth: 1,
    borderColor: "blue",
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 10,
    margin: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    borderRadius: 4,
    padding: 10,
    margin: 5,
  },
});
