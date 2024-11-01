import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import protobuf from "protobufjs";
import { packetNames } from "../../protobuf/packetNames.js";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.join(__fileName);
const baseDir = path.join(__dirName, "../../../protobuf");

// 지정된 폴더의 .proto 파일 경로를 재귀적으로 지정
const getAllProtoFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllProtoFiles(filePath, fileList);
    } else if (path.extname(file) === ".proto") {
      fileList.push(filePath);
    }
  });
  return fileList;
};

const allProtoFiles = getAllProtoFiles(baseDir);
const protoMessages = {};

// 지정된 파일의 .proto파일 load
export const loadProtos = async () => {
  try {
    const root = new protobuf.Root();
    await Promise.all(allProtoFiles.map((protoFile) => root.load(protoFile)));

    for (const [namespace, types] of Object.entries(packetNames)) {
      protoMessages[namespace] = {};
      for (const [type, typeName] of Object.entries(types)) {
        protoMessages[namespace][type] = root.lookupType(typeName);
      }
    }
  } catch (error) {
    throw new Error(`proto파일 로드에 실패하였습니다. ${error.message}`);
  }
};

// protoMessages 내용 조회
export const getProtoMessages = () => {
  return { ...protoMessages };
};
