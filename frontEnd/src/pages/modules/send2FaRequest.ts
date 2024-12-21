import { AxiosInstance } from "axios";
import QRCode from "qrcode";

const sendRequest2Fa = async (axiosHook: AxiosInstance): Promise<string> => {
  try {
    const response = await axiosHook.post("enable2fa");
    console.log("response from setting Profile 2fa");
    console.log(response);
    return await QRCode.toDataURL(response.data.otp);
  } catch (err) {
    console.log("error in error frow setting Profile 2fa");
    console.log(err);
  }
  return "";
};
const sendRequest2FaDeactivate = async (
  axiosHook: AxiosInstance
): Promise<void> => {
  try {
    const response = await axiosHook.get("enable2fa");
    console.log("response from setting Profile 2fa");
    console.log(response);
  } catch (err) {
    console.log("error in error frow setting Profile 2fa");
    console.log(err);
  }
};

export { sendRequest2Fa, sendRequest2FaDeactivate };
