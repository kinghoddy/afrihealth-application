import { View, Alert, Dimensions } from "react-native";
import React, { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { GlobalContext } from "../context/Provider";
import MapViewDirections from "react-native-maps-directions";
import colors from "../theme/colors";
const API_KEY = "AIzaSyCDO7ghQKlCUBOb-SzUjaSiQ17GRw9sVTs";
const defaultRegion = {
  latitude: 6.465422,
  longitude: 3.406448,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

const mapStyle = {
  dark: [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#262626",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#746855",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#242f3e",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#263c3f",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#6b9a76",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#38414e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#212a37",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9ca5b3",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#746855",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#1f2835",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#f3d19c",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [
        {
          color: "#2f3948",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#17263c",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#515c6d",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#17263c",
        },
      ],
    },
  ],
  light: [
    {
      featureType: "poi.business",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ],
};

const Map = ({ style, origin, destination }) => {
  const { themeState } = React.useContext(GlobalContext);
  const [region, setRegion] = useState(defaultRegion);
  const { width, height } = Dimensions.get("window");
  const mapRef = React.useRef();
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Error", "Permission to access location was denied");
        console.log(status);
        return;
      }
      try {
        let location = await Location.getCurrentPositionAsync({
          accuracy: 0.5,
        });
        let r = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: location.coords.latitude * 0.001,
          longitudeDelta: location.coords.longitude * 0.001,
        };

        setRegion(r);
      } catch (err) {
        setRegion(defaultRegion);
        Alert.alert(
          "Can't accessing your location",
          "Make sure your location settings are turned on. "
        );
      }
    })();
  }, []);

  const onRegionChange = (r) => {
    // setRegion(r);
  };

  return (
    <View style={style}>
      <MapView
        zoomEnabled={true}
        ref={mapRef}
        onRegionChange={onRegionChange}
        pitchEnabled={false}
        customMapStyle={mapStyle[themeState.value]}
        region={region}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={{ height: "100%", width: "100%" }}
      >
        {Boolean(origin?.latitude) && (
          // <Marker coordinate={origin}>
          //   <RiderIcon color={colors(themeState.value).primary.main} />
          // </Marker>
          <Marker coordinate={origin} pinColor="#08f" />
        )}
        {Boolean(destination?.latitude) && <Marker coordinate={destination} />}

        {Boolean(origin.latitude && destination.latitude) && (
          <MapViewDirections
            origin={origin}
            optimizeWaypoints={true}
            onReady={(result) => {
              // setRegion()

              // mapRef.current.fitToCoordinates(result.coordinates, {
              //   edgePadding: {
              //     right: width / 20,
              //     bottom: height / 15,
              //     left: width / 20,
              //     top: height / 15,
              //   },
              // });
              let r = {
                latitude: result.coordinates[0].latitude,
                longitude: result.coordinates[0].longitude,
                latitudeDelta:
                  Math.abs(destination.latitude - origin.latitude) *
                  0.5 *
                  result.coordinates[0].latitude,
                longitudeDelta:
                  Math.abs(destination.longitude - origin.longitude) *
                  0.5 *
                  result.coordinates[0].longitude,
              };

              setRegion(r);
            }}
            destination={destination}
            apikey={API_KEY}
            strokeWidth={5}
            strokeColor={colors(themeState.value).primary.main}
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;
