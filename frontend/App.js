import { Provider } from "react-redux";
import store from "./src/redux/store";
import RootNavigation from "./src/RootNavigation";
import PushNotificationManager from "./src/utils/pushNotificationManager"

export default function App() {

  return (
    <Provider store={store} >
      <PushNotificationManager>
        <RootNavigation />
      </PushNotificationManager>
    </Provider>
  );
}
