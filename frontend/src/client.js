"use strict";
import exp from 'constants';
import {getAllGroups, getAllLights, turnOnGroup, turnOffGroup, turnOnLight, turnOffLight, setGroupBrightness, setLightBrightness } from '../../backend/src/server.js';


async function main() {
    try {
        const group = await getAllGroups(); // 0% = 0, 50% = 127, 100% = 254
        console.log(group);
    } catch (error) {
      console.error(error.message);
    }
};
main()



export default function app() {
  main()
};