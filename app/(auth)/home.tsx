import { Button, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";

export default function Home() {
	return (
		<View>
			<Button title='Sign Out' onPress={() => auth().signOut()} />
		</View>
	);
}
