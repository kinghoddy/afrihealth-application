import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Map from "../components/Map";
import { ScaledSheet } from "react-native-size-matters";
import Button, { IconButton } from "../components/UI/Button";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../theme/colors";
import { GlobalContext } from "../context/Provider";
import Typography from "../components/UI/Typography";
import TextField from "../components/UI/TextField";
import Locator from "../components/Locator";
import Grid, { GridItem } from "../components/UI/Grid";
import { calculateEstimate, currencyFormatter } from "../utility";
import { addRide } from "../context/actions/ride";
import FormWrapper from "../components/UI/FormWrapper";

const OrderScreen = ({ navigation }) => {
  const { themeState, rideDispatch } = React.useContext(GlobalContext);
  const [pickup, setPickup] = useState({});
  const [destination, setDestination] = useState({});
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cost, setCost] = useState(0);
  const styles = ScaledSheet.create({
    root: {
      flex: 1,
    },
    backBtn: {
      position: "absolute",
      top: "40@ms",
      left: "20@ms",
      zIndex: 100,
      backgroundColor: colors(themeState.value).white[1],
      borderRadius: 25,
      height: 50,
      width: 50,
      alignItems: "center",
      justifyContent: "center",
      elevation: 6,
      shadowColor: "#000",
      shadowRadius: 6,
      shadowOpacity: 0.1,
    },
    stepper: {
      paddingHorizontal: "20@ms",
      paddingVertical: "20@ms",
    },

    loading: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      bottom: 0,
      left: 0,
      height: "100%",
      zIndex: 100,
      width: "100%",
      backgroundColor: colors(themeState.value).white[1] + "a",
    },
    locator: {
      flexDirection: "row",
      borderLeftColor: colors(themeState.value).white[4],
      borderLeftWidth: 1,
    },
    pin: {
      left: "-10@ms",
    },
  });

  const calculateCost = async () => {
    setLoading(true);
    const d = {
      origin: pickup.lat + "," + pickup.lng,
      destination: destination.lat + "," + destination.lng,
    };
    const res = await calculateEstimate(d);
    setCost(res);
    setLoading(false);
  };

  const increaseStep = () => {
    if (step === 0) {
      if (!pickup.description) return Alert.alert("Pickup Location required");
      if (!destination.description) return Alert.alert("Destination required");

      calculateCost();
      setStep(step + 1);
    } else if (step === 1) {
    }
  };
  const createRide = async () => {
    setLoading(true);
    await addRide(pickup, destination, cost, rideDispatch);
    setLoading(false);
    navigation.navigate("Home");
  };

  const decreaseStep = () => {
    if (step > 0) setStep(step - 1);
  };
  const steps = [
    {
      comp: (
        <>
          <Typography
            align="center"
            gutterBottom={20}
            fontWeight={700}
            variant="h6"
          >
            Book a ride
          </Typography>

          <View style={styles.locator}>
            <MaterialIcons
              style={styles.pin}
              name="location-pin"
              color="#07f"
              size={24}
            />
            <Locator
              onLocationSelected={setPickup}
              location={pickup}
              placeholder="Add pickup"
              gutterBottom={20}
            />
          </View>
          <View style={styles.locator}>
            <MaterialIcons
              style={styles.pin}
              name="location-pin"
              color="#f00"
              size={24}
            />

            <Locator
              onLocationSelected={setDestination}
              location={destination}
              placeholder="Add Destination"
            />
          </View>
          <Button
            style={{ marginTop: 35 }}
            onPress={increaseStep}
            title="Continue"
            elevation={0}
          />
        </>
      ),
    },
    {
      comp: (
        <>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <IconButton
              icon="arrow-back"
              containerStyles={{ marginRight: 10 }}
              onPress={decreaseStep}
            />
            <Typography align="center" fontWeight={700} variant="h6">
              Ride Estimate
            </Typography>
          </View>

          <Grid>
            <GridItem>
              <Typography variant="h6">{cost.duration?.text}</Typography>
              <Typography variant="caption" color="textSecondary">
                Duration
              </Typography>
            </GridItem>
            <GridItem>
              <Typography variant="h6">{cost.distance?.text}</Typography>
              <Typography variant="caption" color="textSecondary">
                Distance{" "}
              </Typography>
            </GridItem>
          </Grid>

          <Typography
            color="textSecondary"
            variant="body2"
            style={{ marginTop: 20 }}
          >
            Cost{" "}
          </Typography>
          <Typography
            color="success"
            fontWeight={700}
            gutterBottom={30}
            variant="h3"
          >
            {currencyFormatter(cost.price)}
          </Typography>

          <Button title="Finish" onPress={createRide} />
        </>
      ),
    },
  ];

  return (
    <View style={styles.root}>
      <FormWrapper keyboardVerticalOffset={10} behavior="position">
        <Map
          origin={{
            latitude: pickup?.lat,
            longitude: pickup?.lng,
          }}
          destination={{
            latitude: destination?.lat,
            longitude: destination?.lng,
          }}
          style={{ height: Dimensions.get("screen").height / 2 }}
        />
        <TouchableOpacity style={styles.backBtn} onPress={navigation.goBack}>
          <MaterialIcons
            name="arrow-back"
            size={26}
            color={colors(themeState.value).black[1]}
          />
        </TouchableOpacity>
        <View>
          <View style={styles.stepper}>{steps[step].comp}</View>

          {loading && (
            <View style={styles.loading}>
              <ActivityIndicator
                size="large"
                color={colors(themeState.value).primary.light}
              />
            </View>
          )}
        </View>
      </FormWrapper>
    </View>
  );
};

export default OrderScreen;
