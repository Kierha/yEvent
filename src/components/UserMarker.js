import React from "react";
import { Marker } from "react-native-maps";

const UserMarker = ({ location }) => {
  return (
    <Marker
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
      title="Your Location"
      pinColor="blue"
    />
  );
};

export default UserMarker;
