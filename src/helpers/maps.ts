import * as fs from '@tauri-apps/api/fs';
import * as path from '@tauri-apps/api/path';
import { v4 as uuidv4 } from 'uuid';

import { getImgSrc } from './app-fs';

export type Map = {
  uuid: string,
  name: string,
  imgPath?: string,
  imgSrc: string,
  added_by_user: boolean,
}

type MapsObj = {
  [key: string]: Map 
};

export let default_maps: MapsObj = {
  'def-0': {
    uuid: 'def-0',
    name: 'Isle Of Donkk',
    imgSrc: '/assets/img/maps/isle-of-donkk.png',
    added_by_user: false,
  },
  'def-1': {
    uuid: 'def-1',
    name: 'Isle Of Donkk + Camodo',
    imgSrc: '/assets/img/maps/donkk-camodo.png',
    added_by_user: false,
  },
  'def-2': {
    uuid: 'def-2',
    name: 'Main Island',
    imgSrc: '/assets/img/maps/main-island.png',
    added_by_user: false,
  }
};

export let imported_maps: MapsObj = {};

export async function getMaps(): Promise<MapsObj> {
  if(!Object.values(imported_maps).length) await loadImportedMaps();

  return Object.assign({}, default_maps, imported_maps);
}

export function loadImportedMaps() {
  return fs.readTextFile('./maps/maps.json', {
    dir: fs.BaseDirectory.App
  }).then(data => {
    imported_maps = JSON.parse(data);
  }).catch(() => {});
}

export function saveImportedMaps() {
  return fs.writeFile({
    path: './maps/maps.json',
    contents: JSON.stringify(imported_maps, null, 2),
  }, {
    dir: fs.BaseDirectory.App
  });
}

export async function deleteMap(map: Map) {
  await deleteMapImg(map);
  delete imported_maps[map.uuid];
  await saveImportedMaps();
}

export async function deleteMapImg(map: Map) {
  return fs.removeFile(map.imgPath, {
    dir: fs.BaseDirectory.App
  });
}

export async function addMap(name: string, imgPath: string): Promise<void> {

  const uuid = uuidv4();

  const savedImgPath = await saveMapImg(imgPath, uuid);

  imported_maps[uuid] = {
    uuid, name,
    imgPath: savedImgPath,
    imgSrc: await getImgSrc(savedImgPath),
    added_by_user: true,
  }

  await saveImportedMaps();

}

export async function saveMapImg(imgPath: string, uuid: string): Promise<string> {

  const pathToCopy = `./maps/${uuid}.${await path.extname(imgPath)}`;

  await fs.createDir('./maps', {
    dir: fs.BaseDirectory.App,
    recursive: true,
  });

  await fs.copyFile(imgPath, await path.appDir() + pathToCopy);

  return pathToCopy;

}
