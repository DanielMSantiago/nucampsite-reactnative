import { ScrollView, Text } from "react-native";
import { Card } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { Button, Icon } from "react-native-elements";
import * as MailComposer from "expo-mail-composer";

const ContactScreen = () => {
  const sendMail = () => {
    MailComposer.composeAsync({
      recipients: ["campsites@nucamp.co"],
      subject: "Inquiry",
      body: "To Whom it May Concern:",
    });
  };
  return (
    <ScrollView>
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card wrapperStyle={{ margin: 20 }}>
          <Card.Title>
            <Text>Contact Information</Text>
          </Card.Title>
          <Card.Divider />
          <Text>1 Nucamp Way</Text>
          <Text>Seattle, WAS 98001</Text>
          <Text style={{ marginBottom: 10 }}>U.S.A.</Text>
          <Text>Phone: 1-206-555-1234</Text>
          <Button
            title="Send Email"
            button={{ backgroundColor: "#5637dd", margin: 40 }}
            icon={
              <Icon
                name="envelope-o"
                type="font-awesome"
                color="#fff"
                iconStyle={{ marginRight: 10 }}
              />
            }
            onPress={() => sendMail()}
          />
        </Card>
      </Animatable.View>
    </ScrollView>
  );
};

export default ContactScreen;
