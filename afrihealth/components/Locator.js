import { View, Alert } from "react-native";
import React, { useState } from "react";
import TextField from "./UI/TextField";
import { ListItem, ListItemText } from "./UI/List";
import colors from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { GlobalContext } from "../context/Provider";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import Typography from "./UI/Typography";
import Button, { IconButton } from "./UI/Button";
import * as Location from "expo-location";

const API_KEY = "AIzaSyCDO7ghQKlCUBOb-SzUjaSiQ17GRw9sVTs";
Location.setGoogleApiKey(API_KEY);

const Locator = ({
  onLocationSelected,
  placeholder,
  error,
  location = {},
  gutterBottom = 0,
  helperText,
}) => {
  const [changed, setChanged] = useState(false);
  const [value, setValue] = useState("");
  const [prediction, setPrediction] = useState([]);
  const { themeState } = React.useContext(GlobalContext);

  const styles = ScaledSheet.create({
    list: {
      backgroundColor: colors(themeState.value).white[3],
      borderRadius: 10,
      marginBottom: "10@ms",
    },
  });
  const search = async (query) => {
    const endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&components=country:ng&radius=20000&location=6.465422,3.406448&key=${API_KEY}`;
    const res = await (await fetch(endpoint)).json();
    const p = [];
    for (let key in res.predictions) {
      const { description, place_id } = res.predictions[key];
      p.push({
        description,
        id: place_id,
      });
    }
    setPrediction(p);
  };

  const locateMe = () => {
    // Alert.alert(
    //   "Use my location",
    //   "Auto fill this input with my current location",
    //   [{ text: "Cancel" }, { text: "Use Location", onPress: () => getLoc() }]
    // );
    const getLoc = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted")
        return Alert.alert(
          "Error",
          "Permission to access location was denied! "
        );
      try {
        let { coords } = await Location.getCurrentPositionAsync({
          accuracy: 0.5,
        });
        const res = await (
          await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?radius=200&latlng=${coords.latitude},${coords.longitude}&key=${API_KEY}`
          )
        ).json();

        const p = [];

        for (let key in res.results) {
          const { formatted_address: description, place_id } = res.results[key];
          p.push({
            description,
            id: place_id,
            latLng: { lst: coords.latitude, lng: coords.longitude },
          });
        }
        setPrediction(p);
      } catch (err) {
        Alert.alert(
          "Can't access your location",
          "Make sure your location settings are turned on and you are connected to the internet. "
        );
      }
    };
    getLoc();
  };

  const clear = () => {
    setPrediction([]);
    setValue("");
    onLocationSelected({
      description: null,
    });
    setChanged(false);
  };
  const locationPressed = async (loc) => {
    setValue(loc.description);
    const res = await (
      await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${loc.id}&fields=formatted_address%2Cgeometry&key=${API_KEY}`
      )
    ).json();
    onLocationSelected({
      ...res.result?.geometry.location,
      description: loc.description,
    });
    setChanged(false);
    setPrediction([]);
  };

  return (
    <View style={{ flex: 1 }}>
      <TextField
        placeholder={placeholder}
        onChangeText={(val) => {
          setChanged(true);
          setValue(val);
          search(val);
        }}
        onBlur={(e) => {
          setPrediction([]);
        }}
        onFocus={() => {
          search(value);
        }}
        value={changed ? value : location.description || value}
        gutterBottom={gutterBottom}
        error={error}
        helperText={helperText}
        end={
          <View style={{ flexDirection: "row" }}>
            <IconButton
              onPress={locateMe}
              icon="location-pin"
              color="secondary"
              containerStyles={{ marginRight: 10 }}
              bg
              size={15}
            />
            <IconButton onPress={clear} icon="close" bg size={12} />
          </View>
        }
      />

      {prediction.length > 0 && (
        <View style={styles.list}>
          {prediction.map(
            (cur, i) =>
              i < 5 && (
                <ListItem
                  divider={i < prediction.length - 1}
                  key={cur.id}
                  link
                  onPress={() => locationPressed(cur)}
                >
                  <Ionicons
                    name="location-outline"
                    style={{ marginRight: 10 }}
                    size={16}
                    color={colors(themeState.value).textSecondary.main}
                  />
                  <Typography variant="body2" style={{ flex: 1 }}>
                    {cur.description}
                  </Typography>
                </ListItem>
              )
          )}
        </View>
      )}
    </View>
  );
};

export default Locator;
