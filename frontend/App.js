import { PointsProvider, UserProvider } from "./src/context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./src/navigation";

export default function App() {
  return (
    <UserProvider>
      <PointsProvider>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </PointsProvider>
    </UserProvider>
  );
}
