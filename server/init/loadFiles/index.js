import { loadAssets } from "./assets.js";
import { loadProtos } from "./loadProtos.js";

// assets, proto 파일 로드 하기
export const loadFiles = async () => {
  try {
    await loadAssets();
    await loadProtos();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
