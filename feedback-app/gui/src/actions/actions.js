import { json } from "react-router"

const SERVER = 'http://localhost:8080'


export function getUser(username) {
  return {
    type: 'GET_USERS',
    payload: async () => {
      const response = await fetch(`${SERVER}/users/${username}`)
      const data = await response.json()
      console.log("data: " + data);
      return data
    }
  }
}

export function login(inputs) {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputs)
  };

  return {
    type: 'LOGIN_USER',
    payload: async () => {
      const response = await fetch(`${SERVER}/login`, requestOptions)
      const data = await response.json()
      //console.log("data: " + JSON.stringify(data));
      return { status: response.status, data: data }
    }
  }
}