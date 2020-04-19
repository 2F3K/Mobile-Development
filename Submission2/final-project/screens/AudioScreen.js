import React, { useEffect, useReducer } from "react";
import { View, Text, Button, Alert, TouchableOpacity } from "react-native";
import CircleButton from "react-native-circle-button";
import { Audio } from "expo-av";
import * as Permissions from "expo-permissions";
import { styles } from "../styles/styles";

import PlayIcon from "../icons/play(64).png";
import StopIcon from "../icons/stop(64).png";
import PauseIcon from "../icons/pause(64).png";
import ReplayIcon from "../icons/replay(64).png";

const AudioScreen = () => {

  let recording = null,
    soundObject = null,
    recordingPos = 0;
  let recordingStatus = "ready";
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, {
    status: "Ready to Record",
    section: undefined,
    recordingState: "ready",
    recordButtons: false,
    isRecording: false,
  });

  useEffect(() => {
    recordingStatus = state.recordingState;
  }, [state.recordingStatus]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant audio recording permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const startRecordingAudio = async () => {
    let hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return false;
    } else {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,
      });

      recording = new Audio.Recording();
      try {
        await recording.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        await recording.startAsync();
        console.log("Recording.");
      } catch (error) {
        console.log("Unable to start Recording.");
        console.log(error);
      }
    }
  };

  const stopRecordingAudio = async () => {
    try {
      await recording.stopAndUnloadAsync();
      console.log("Stopped recording.");
    } catch (error) {
      console.log("Error stopping recording.");
      console.log(error);
    }
  };

  const playRecordedAudio = async () => {
    await Audio.setAudioModeAsync({
      // set to false to play through speaker (instead of headset)
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });

    recording = state.recording;
    soundObject = new Audio.Sound();

    try {
      await soundObject.loadAsync({ uri: recording.getURI() });
      await soundObject.setStatusAsync({
        isLooping: true,
        positionMillis: recordingPos,
      });
      await soundObject.playAsync();
      console.log("Playing Recording.");
    } catch (error) {
      console.log("Playback Error.");
      console.log(error);
    }
  };

  const stopPlayingRecordedAudio = async () => {
    if (soundObject != undefined) {
      try {
        await soundObject.stopAsync();
        console.log("Stopped Playback.");
      } catch (error) {
        console.log("Playback stop Error.");
        console.log(error);
      }
    }
  };

  const pausePlayingRecordedAudio = async () => {
    try {
      await soundObject.pauseAsync();
      let a = await soundObject.getStatusAsync();
      recordingPos = a.positionMillis;
    } catch (error) {
      console.log("Playback Pause Error.");
      console.log(error);
    }
  };

  const restartPlayingRecordedAudio = async () => {
    try {
      recordingPos = 0;
      await soundObject.setPositionAsync(recordingPos);
    } catch (error) {
      console.log("Playback Restart Error.");
      console.log(error);
    }
  };

  const recording_Ready = async () => {
    if (soundObject !== null) await soundObject.unloadAsync();
    setState({
      status: "Ready to Record",
      section: recording_Available(),
      recordingState: "ready",
      recordButtons: false,
    });
  };

  const recording_Start = async () => {
    await startRecordingAudio();
    setState({
      status: "Recording Audio",
      recordingState: "recording",
      recordButtons: true,
      recording: recording,
      isRecording: true,
    });
  };

  const recording_Stop = async () => {
    recording = state.recording;
    setState({
      status: "Recording Stopped!",
      recordingState: "stop",
      recordButtons: true,
      isRecording: false,
    });
    await stopRecordingAudio();
  };

  const recording_Available = () => {
    return (
      <View>
        <View
          style={{ padding: 10, alignContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "white" }}>Start Recording</Text>
          <TouchableOpacity
            style={styles.customplaybutton}
            disabled={state.recordButtons}
            onPress={() => {
              setRecordingState("recording");
            }}
          >
            <Text style={styles.playicon}>&#x25B6;</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{ padding: 10, alignContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "white" }}>Stop Recording</Text>
          <TouchableOpacity
            style={styles.customstopbutton}
            disabled={!state.recordButtons}
            onPress={() => {
              setRecordingState("stop");
            }}
          >
            <Text style={styles.stopicon}>⏹️</Text>
          </TouchableOpacity>
        </View>
        {state.isRecording ? (
          <View style={{ alignContent: "center", alignItems: "center" }}>
            <Text style={{ color: "white" }}>Recording in progress...</Text>
          </View>
        ) : null}
      </View>
    );
  };

  const recording_Stopped = () => {
    return (
      <>
        <View style={styles.row}>
          <View style={styles.row}>
            <CircleButton
              size={100}
              iconButtonTop={PlayIcon}
              iconButtonRight={PauseIcon}
              iconButtonBottom={StopIcon}
              iconButtonLeft={ReplayIcon}
              onPressButtonTop={playRecordedAudio}
              onPressButtonRight={pausePlayingRecordedAudio}
              onPressButtonBottom={stopPlayingRecordedAudio}
              onPressButtonLeft={restartPlayingRecordedAudio}
            />
          </View>
        </View>
        <View style={{ alignItems: "center", alignContent: "center" }}>
          <View style={{ width: 200 }}>
            <Button
              title="Delete Recording"
              color="orange"
              onPress={() => {
                setRecordingState("ready");
              }}
            />
          </View>
        </View>
      </>
    );
  };

  function recordingType() {
    switch (state.recordingState) {
      case "ready":
        return recording_Available();
      case "recording":
        return recording_Available();
      case "stop":
        return recording_Stopped();
      default:
        return recording_Available();
    }
  }

  const setRecordingState = (choice) => {
    switch (choice) {
      case "ready":
        recording_Ready();
        break;
      case "recording":
        recording_Start();
        break;
      case "stop":
        recording_Stop();
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.audioscreen}>
      <View>
        <View style={styles.title}>
          <View>
            <Text style={{ color: "white", fontSize: 30 }}>
              Grocery List Recorder
            </Text>
          </View>
          <View>
            <Text style={{ color: "white" }}>Audio Recorder</Text>
          </View>
        </View>
        <View>
          <View>
            <Text>{state.status}</Text>
          </View>
          {recordingType()}
        </View>
      </View>
    </View>
  );
};
export default AudioScreen;
