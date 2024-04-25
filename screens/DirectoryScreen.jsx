import { Tile } from "react-native-elements";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "../.expo/components/LoadingComponent";
import * as Animatable from "react-native-animatable";

const DirectoryScreen = ({ navigation }) => {
  const campsites = useSelector((state) => state.campsites);
  if (campsites.isLoading) {
    return <Loading />;
  }

  if (campsites.errMess) {
    return (
      <View>
        <Text>{campsites.errMess}</Text>
      </View>
    );
  }

  const renderDirectoryItem = ({ item: campsite }) => {
    return (
      <Tile
        title={campsite.name}
        caption={campsite.description}
        featured
        onPress={() => navigation.navigate("CampsiteInfo", { campsite })}
        imageSrc={{ uri: baseUrl + campsite.image }}
      />
    );
  };
  return (
    <Animatable.View animation="fadeInRightBig" duration={2000}>
      <FlatList
        data={campsites.campsitesArray}
        renderItem={renderDirectoryItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Animatable.View>
  );
};

export default DirectoryScreen;
