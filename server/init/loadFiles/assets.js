import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
const basePath = path.join(__dirName, "../../../assets");

let gameAssets = {};

// 파일 경로 지정
const readFileAsync = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(basePath, fileName), "utf-8", (error, data) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(JSON.parse(data));
    });
  });
};

// 지정된 파일 load
export const loadAssets = async () => {
  try {
    const [item_unlock, item, stage] = await Promise.all([
      readFileAsync("item_unlock.json"),
      readFileAsync("item.json"),
      readFileAsync("stage.json"),
    ]);
    gameAssets = { item_unlock, item, stage };
    return gameAssets;
  } catch (error) {
    throw new Error(`assets 로드에 실패하였습니다. ${error.message}`);
  }
};

// assets 내용 조회
export const getGameAssets = () => {
  return gameAssets;
};
