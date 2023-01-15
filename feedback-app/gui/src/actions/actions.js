import { json } from "react-router"

const SERVER = 'http://localhost:8080'


export function getUser(username) {
  return {
    type: 'GET_USERS',
    payload: async () => {
      const response = await fetch(`${SERVER}/users/${username}`)
      const data = await response.json()
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
      return { status: response.status, data: data }
    }
  }
}

export function register(inputs){
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputs)
  };

  return {
    type: 'REGISTER_USER',
    payload: async () => {
      const response = await fetch(`${SERVER}/users`, requestOptions)
      const data = await response.json()
      return { status: response.status, data: data }
    }
  }
}

export function getActivities(){
  return {
    type: 'GET_ACTIVITIES',
    payload: async () => {
      const response = await fetch(`${SERVER}/activities`)
      const data = await response.json()
      return data
    }
  }
}

export function getAvailableActivities(){
  return {
    type: 'GET_ACTIVITIES',
    payload: async () => {
      const response = await fetch(`${SERVER}/available-activities`)
      const data = await response.json()
      return data
    }
  }
}

export function getProfessors(){
  return {
    type: 'GET_PROFESSORS',
    payload: async () => {
      const response = await fetch(`${SERVER}/professors`)
      const data = await response.json()
      return data
    }
  }
}

export function submitActivity(inputs){
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputs)
  };

  return {
    type: 'SUBMIT_ACTIVITY',
    payload: async () => {
      const response = await fetch(`${SERVER}/activities`, requestOptions)
      const data = await response.json()
      return { status: response.status, data: data }
    }
  }
}