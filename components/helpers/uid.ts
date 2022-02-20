import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import * as Analytics from "expo-firebase-analytics";

const DEVICE_ID_KEY = "secure_device_id";

export const getUID = async () => {
  let uidParsed = null;
  const uidFromStore = await SecureStore.getItemAsync(DEVICE_ID_KEY);

  if (uidFromStore) {
    uidParsed = JSON.parse(uidFromStore);
  }

  return uidParsed;
};

const setUID = async (uid: string) =>
  await SecureStore.setItemAsync(DEVICE_ID_KEY, JSON.stringify(uid));

export const checkAndSetUID = async () => {
  let uid = await getUID();

  if (!uid) {
    uid = uuidv4();
    await setUID(uid);
  }

  await Analytics.setUserId(uid);
};
