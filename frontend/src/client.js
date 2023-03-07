"use strict";
import {getAllGroups, getAllLights, turnOnGroup, turnOffGroup, turnOnLight, turnOffLight, setGroupBrightness, setLightBrightness } from '../../backend/src/server.js';
import promptSync from 'prompt-sync';
const prompt = promptSync();




/**
 * Function that displays menu
 */
function displayMenu() {
  const alternatives = ["Display all groups", "Display all lights", "Turn on group", "Turn off group", "Set brightness for group", "Turn on light", "Turn off light", "Set brightness for light", "Quit"];
  console.log("-----------------------------------------------------------------------------------------");
  for (let i = 0; i < alternatives.length; i++) {
    console.log(`| ${i + 1}. ${alternatives[i]}`);
  }
  console.log("-----------------------------------------------------------------------------------------");
};


/**
 * Function that displays introduction message
 */
function displayHeader() {
  console.log("-----------------------------------------------------------------------------------------");
  console.log("Philips Hue client");
  console.log("-----------------------------------------------------------------------------------------");
}


/**
 * Function that displays exit message
 */
function displayQuit() {
  console.log("-----------------------------------------------------------------------------------------");
  console.log("Exiting the application...");
  console.log("-----------------------------------------------------------------------------------------");
}


/**
 * Function that displays all groups
 */
async function displayAllGroups() {
  try {
    const groups = await getAllGroups();
    for (let i = 0; i < groups.length; i++) {
      console.log("-----------------------------------------------------------------------------------------");
      console.log(`| ID:${groups[i].id} | Name:${groups[i].name} | Class: ${groups[i].class} | Lights:${groups[i].lights} |`);
      console.log(`| On/Off: ${groups[i].action.on} | Brightness: ${groups[i].action.bri} | All On: ${groups[i].state.all_on} | Any On: ${groups[i].state.any_on} |`);
    }
    console.log("-----------------------------------------------------------------------------------------");
    console.log(`(Fetched ${groups.length} of ${groups.length} groups)`);
    console.log("-----------------------------------------------------------------------------------------");
  } catch (error) {
    console.error(error.message);
  }
};


/**
 * Function that displays all lights
 */
async function displayAllLights() {
  try {
    const lights = await getAllLights();
    for (let i = 0; i < lights.length; i++) {
      console.log("-----------------------------------------------------------------------------------------");
      console.log(`| ID:${lights[i].id} | Name:${lights[i].name} | On/Off: ${lights[i].on} | Brightness:${lights[i].bri} |`);
      console.log(`| Type: ${lights[i].type} | ${lights[i].modelid} | ${lights[i].manufacturername} |`);
    }
    console.log("-----------------------------------------------------------------------------------------");
    console.log(`(Fetched ${lights.length} of ${lights.length} lights)`);
    console.log("-----------------------------------------------------------------------------------------");
  } catch (error) {
    console.error(error.message);
  }
};


/**
 * Function that turn on light group
 */
async function displayTurnOnGroup() {
  console.log("----------------------------------------");
  console.log("Turn on group");
  console.log("----------------------------------------");

  const groupId = Number(prompt("Enter ID: "));
  try {
    const turnOn = await turnOnGroup(groupId);
    console.log(turnOn);
  } catch (error) {
    console.error(error.message);
  }
};


/**
 * Function that turn off light group
 */
async function displayTurnOffGroup() {
  console.log("----------------------------------------");
  console.log("Turn off group");
  console.log("----------------------------------------");

  const groupId = Number(prompt("Enter ID: "));
  try {
    const turnOff = await turnOffGroup(groupId);
    console.log(turnOff);
  } catch (error) {
    console.error(error.message);
  }
};


/**
 * Function that turn on light
 */
async function displayTurnOnLight() {
  console.log("----------------------------------------");
  console.log("Turn on light");
  console.log("----------------------------------------");

  const lightId = Number(prompt("Enter ID: "));
  try {
    const turnOn = await turnOnLight(lightId);
    console.log(turnOn);
  } catch (error) {
    console.error(error.message);
  }
};


/**
 * Function that turn off light
 */
async function displayTurnOffLight() {
  console.log("----------------------------------------");
  console.log("Turn off light");
  console.log("----------------------------------------");
  
  const lightId = Number(prompt("Enter ID: "));
  try {
    const turnOn = await turnOffLight(lightId);
    console.log(turnOn);
  } catch (error) {
    console.error(error.message);
  }
};


/**
 * Function that set brightness for group
 */
async function displaySetGroupBrightness() {
  console.log("----------------------------------------");
  console.log("Set brightness for group");
  console.log("0% = 0, 50% = 127, 100% = 254")
  console.log("----------------------------------------");

  const groupId = Number(prompt("Enter ID: "));
  const brightness = Number(prompt("Enter brightness: "));
  try {
    const setBrightness = await setGroupBrightness(groupId, brightness);
    console.log(setBrightness);
  } catch (error) {
    console.error(error.message);
  }
};


/**
 * Function that set brightness for light
 */
async function displaySetLightBrightness() {
  console.log("----------------------------------------");
  console.log("Set brightness for light");
  console.log("0% = 0, 50% = 127, 100% = 254")
  console.log("----------------------------------------");

  const lightId = Number(prompt("Enter ID: "));
  const brightness = Number(prompt("Enter brightness: ")); // 0% = 0, 50% = 127, 100% = 254
  try {
    const setBrightness = await setLightBrightness(lightId, brightness);
    console.log(setBrightness);
  } catch (error) {
    console.error(error.message);
  }
};




export default async function app() {
  displayHeader();
  while (true) {
    displayMenu();
    let redirect = Number(prompt("Enter: "));

    switch (redirect) {
      case 1:
        await displayAllGroups();
        break;
      case 2:
        await displayAllLights();
        break;
      case 3:
        await displayTurnOnGroup();
        break;
      case 4:
        await displayTurnOffGroup();
        break;
      case 5:
        await displaySetGroupBrightness();
        break;
      case 6:
        await displayTurnOnLight();
        break;
      case 7:
        await displayTurnOffLight();
        break;
      case 8:
        await displaySetLightBrightness();
        break;
      case 9:
        displayQuit();
        return;
      default:
        console.log("Please enter a valid option!");
    }
  }
};