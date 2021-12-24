import * as tauri from '@tauri-apps/api/tauri';
import * as path from '@tauri-apps/api/path';

export async function getImgSrc(imgPath: string): Promise<string> {

  imgPath = await path.appDir() + imgPath;

  return tauri.convertFileSrc(imgPath);

}