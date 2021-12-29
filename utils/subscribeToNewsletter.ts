/**
 *
 * @param email email of user to be subscribed to newsletter
 * @returns true or false based on success
 */
export default async function subscribeToNewsletter(
  email: string
): Promise<boolean> {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.io)",
    "Content-Type": "application/json; charset=utf-8",
  };

  let reqOptions = JSON.stringify({
    url: "https://api.convertkit.com/v3/forms/2871455/subscribe",
    method: "POST",
    headers: headersList,
    data:
      '{ \n    "api_key": "NeIvJhiL4Cv-vr1w3_XIvg",\n    "email": "' +
      email +
      '"\n}',
  });

  // TODO integrate form with Convertkit

  // axios.request(reqOptions).then(function (response) {
  //   console.log(response.data);
  // });
  return true;
}
