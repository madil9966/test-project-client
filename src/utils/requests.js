const CREATE_USER_URL = "/users/create-user";
const GET_USERS_URL = "/users/get-users";

export const sendData = async (data) => {
  const response = await fetch(`${CREATE_USER_URL}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const receiveData = async (KEY) => {
  let URL;

  if (KEY === "ALL") URL = GET_USERS_URL;
  else URL = `${GET_USERS_URL}?name=${KEY}`;

  const response = await fetch(`${URL}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};
