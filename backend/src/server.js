"use strict";
import axios from 'axios';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(new URL('../../.env', import.meta.url).pathname)});

const HUE_USERNAME = process.env.HUE_USERNAME;
const HUE_BRIDGE_IP = process.env.HUE_BRIDGE_IP;


/**
 * Function that fetch all light groups and returns the selected properties
 * @returns {Object} - All the light groups or Error
 */
export async function getAllGroups() {
  try {
    const url = `http://${HUE_BRIDGE_IP}/api/${HUE_USERNAME}/groups`;
    const response = await axios.get(url);
    const groups = response.data;
    // Map over each light and return the desired properties
    const group = Object.entries(groups).map(([key, value]) => {
    const {name, lights, state, class: classValue, action} = value; // properties from parent object
    return {id: key, name, lights, state, class: classValue, action};
    });
    return group;
    } catch (error) {
    throw new Error(`Error with fetch of groups - ${error.message}`);
  }
};


/**
 * Function that fetch all lights and returns the selected properties
 * @returns {Object} - All the lights or Error
 */
export async function getAllLights() {
    try {
      const url = `http://${HUE_BRIDGE_IP}/api/${HUE_USERNAME}/lights`;
      const response = await axios.get(url);
      const lights = response.data;
      // Map over each light and return the desired properties
      const light = Object.entries(lights).map(([key, value]) => {
        const {on, bri} = value.state; // properties from state object
        const {name, type, modelid, manufacturername} = value; // properties from parent object
        return {id: key, name, on, bri, type, modelid, manufacturername};
      });
      return light;
    } catch (error) {
      throw new Error(`Error with fetch of lights - ${error.message}`);
    }
};


/**
 * Function that turn on light group
 * @param {Number} groupId - The ID of the group
 * @returns {Object} - Response data
 */
export async function turnOnGroup(groupId) {
    if (!groupId) {
        throw new Error("Missing groupID");
    }
    try {
      const url = `http://${HUE_BRIDGE_IP}/api/${HUE_USERNAME}/groups/${groupId}/action`;
      const response = await axios.put(url, { on: true });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to turn on group: ${error.message}`);
    }
};


/**
 * Function that turn off light group
 * @param {Number} groupId - The ID of the group
 * @returns {Object} - Response data
 */
export async function turnOffGroup(groupId) {
    if (!groupId) {
      throw new Error("Missing groupID");
    }
    try {
      const url = `http://${HUE_BRIDGE_IP}/api/${HUE_USERNAME}/groups/${groupId}/action`;
      const response = await axios.put(url, { on: false });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to turn off group: ${error.message}`);
    }
};


/**
 * Function that turn on light
 * @param {Number} lightId - The ID of the light
 * @returns {Object} - Response data
 */
export async function turnOnLight(lightId) {
    if (!lightId) {
        throw new Error("Missing lightId");
    }
    try {
      const url = `http://${HUE_BRIDGE_IP}/api/${HUE_USERNAME}/lights/${lightId}/state`;
      const response = await axios.put(url, { on: true });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to turn on group: ${error.message}`);
    }
};


/**
 * Function that turn off light
 * @param {Number} lightId - The ID of the light
 * @returns {Object} - Response data
 */
export async function turnOffLight(lightId) {
    if (!lightId) {
        throw new Error("Missing lightId");
    }
    try {
      const url = `http://${HUE_BRIDGE_IP}/api/${HUE_USERNAME}/lights/${lightId}/state`;
      const response = await axios.put(url, { on: false });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to turn on group: ${error.message}`);
    }
};


/**
 * Function that set brightness for group
 * @param {Number} groupId - The ID of the group
 * @param {Nunber} brightness - The level of brightness
 * @returns {Object} - Response data
 */
export async function setGroupBrightness(groupId, brightness) {
    if (!groupId) {
        throw new Error("Missing groupID");
    }
    try {
      const url = `http://${HUE_BRIDGE_IP}/api/${HUE_USERNAME}/groups/${groupId}/action`;
      const response = await axios.put(url, { bri: brightness });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to set group brightness: ${error.message}`);
    }
};


/**
 * Function that set brightness for light
 * @param {Number} lightId - The ID of the light
 * @param {Nunber} brightness - The level of brightness
 * @returns {Object} - Response data
 */
export async function setLightBrightness(lightId, brightness) {
    if (!lightId) {
        throw new Error("Missing lightId");
    }
    try {
      const url = `http://${HUE_BRIDGE_IP}/api/${HUE_USERNAME}/lights/${lightId}/state`;
      const response = await axios.put(url, { bri: brightness });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to set group brightness: ${error.message}`);
    }
};