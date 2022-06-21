import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { GlobalContext } from "../context/Provider";
import { ScaledSheet } from "react-native-size-matters";
import Typography from "../components/UI/Typography";
import AdaptiveStatusBar from "../components/AdapativeStatusBar";
import globalStyles from "../theme/globalStyles";
import Button from "../components/UI/Button";
import { objToArray } from "../utility";
import { ListItem, ListItemText } from "../components/UI/List";
import RideComp from "../components/RideComp";
import colors from "../theme/colors";

const Home = ({ navigation }) => {
  const { themeState, rideState } = React.useContext(GlobalContext);
  const styles = ScaledSheet.create({
    toolbar: {
      paddingHorizontal: "20@ms",
      paddingTop: "10@ms",
      marginBottom: 20,
    },

    list: {
      paddingHorizontal: "20@ms",
    },
    loader: {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return (
    <SafeAreaView style={globalStyles.droidSafeArea}>
      <AdaptiveStatusBar />
      <ScrollView>
        <View style={styles.toolbar}>
          <Typography fontWeight={700} variant="h4">
            Driver
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Ride requests are shown below
          </Typography>
        </View>

        <View style={styles.list}>
          {objToArray(rideState.data)
            .sort((a, b) => b.date - a.date)
            .map((cur) => (
              <RideComp {...cur} id={cur.key} />
            ))}
        </View>
      </ScrollView>
      {rideState.loading && (
        <View style={styles.loader}>
          <ActivityIndicator
            color={colors(themeState).primary.main}
            size="large"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
