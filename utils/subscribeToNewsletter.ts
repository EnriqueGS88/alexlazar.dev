import axios from "axios";

interface IfcResponse {
  subscription: {
    id: number;
    state: string;
    created_at: string;
    source?: any;
    referrer?: any;
    subscribable_id: number;
    subscribable_type: string;
    subscriber: {
      id: number;
    };
  };
}

/**
 *
 * @param email email of user to be subscribed to newsletter
 * @returns true or false based on success
 */
export default async function subscribeToNewsletter(
  email: string
): Promise<boolean> {
  try {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json; charset=utf-8",
    };

    let reqOptions = {
      url: "https://api.convertkit.com/v3/forms/2871455/subscribe",
      method: "POST",
      headers: headersList,
      data:
        '{ \n    "api_key": "NeIvJhiL4Cv-vr1w3_XIvg",\n    "email": "' +
        email +
        '"\n}',
    };

    //@ts-ignore
    const response = await axios.request(reqOptions);
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
