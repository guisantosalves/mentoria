import { Session } from "../screens/Main/SessionsScreen";

type RootStackParamList = {
    SessionsScreen: undefined;
    SessionDetailsScreen: { session: Session };
};
