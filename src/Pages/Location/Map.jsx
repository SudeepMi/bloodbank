import {
  Flex,
  Heading,
  MapView,
  View,
  Text,
  Image,
} from "@aws-amplify/ui-react";
import { useMemo, useState } from "react";
import  Marker from "react-map-gl/dist/esm/index";
import "@aws-amplify/ui-react/styles.css";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";


function App() {
  const locationData = [
    {
      id: 1,
      title: "Amplify Team Dinner",
      description:
        "It's not everyone, but I'm grateful I was able to see folks in real life and bond over food, drinks and laughs!",
      image:
        "https://aws-map-seattle-blog-pics.s3.amazonaws.com/public/IMG_20220330_204113.jpeg",
      longitude: -122.3098577,
      latitude: 47.6248646,
    },
    {
      id: 3,
      title: "Amplify Team Dinner",
      description:
        "It's not everyone, but I'm grateful I was able to see folks in real life and bond over food, drinks and laughs!",
      image:
        "https://aws-map-seattle-blog-pics.s3.amazonaws.com/public/IMG_20220330_204113.jpeg",
      longitude: -122.3098577,
      latitude: 47.6248646,
    },
  ];

  const pins = useMemo(
    () =>
      locationData.map((city, index) => (
        <Marker
          key={index}
        logoPosition={"center"}
        testMode={true}
        dragPan={true}
        dragRotate={true}
        scrollZoom={true}
        latitude={ -22.3098577}
        longitude={85.3239595}
        doubleClickZoom={true}
        touchZoom={true}
        touchRotate={true}
        scale={0.8}
        color={"#ff0000"}
        style={{
          width: "15px",
          height: "15px",
          backgroundColor: "red",
          borderRadius: "50%",
        }}
        
      />
      )),
    []
  );

  return (
    <View>
      <Flex direction={"column"} alignItems={"center"}>
        <Heading level={3}>Amplify Seattle Visit</Heading>
        <MapView
          initialViewState={{
            latitude: 27.6704274,
            longitude: 85.3509595,
            zoom: 10,
          }}
          style={{ width: "90vw", height: "500px" }}
          mapLib={maplibregl}
        >
         
          {pins}
          {/* {pins} */}
          {/* ))} */}
        </MapView>
      </Flex>
    </View>
  );
}

export default App;
