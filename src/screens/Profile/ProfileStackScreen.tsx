import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./Profile";
import EditProfile from "./EditProfile";

const ProfileStack = createStackNavigator();

export default function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name='Profile' component={Profile} />
      <ProfileStack.Screen name='EditProfile' component={EditProfile} />
    </ProfileStack.Navigator>
  );
}