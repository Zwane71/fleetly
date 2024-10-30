import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
	const [intializing, setIntializing] = useState(true);
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
	const router = useRouter();
	const segements = useSegments();

	const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
		console.log("onAuthStateChanged", user);
		setUser(user);
		if (intializing) setIntializing(false);
	};

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);

	useEffect(() => {
		if (intializing) return;

		const inAuthGroup = segements[0] === "(auth)";

		if (user && !inAuthGroup) {
			router.replace("/(auth)/home");
		} else if (!user && inAuthGroup) {
			router.replace("/");
		}
	}, [user, intializing]);

	if (intializing)
		return (
			<View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
				<ActivityIndicator size={"large"} />
			</View>
		);
	return (
		<Stack>
			<Stack.Screen name='index' />
			<Stack.Screen name='(auth)' options={{ headerShown: false }} />
		</Stack>
	);
}
