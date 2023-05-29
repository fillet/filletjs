import fs, { promises as fsAsync } from 'fs';
import path from 'path';

export const PROCESS_PATH = process.cwd();

export const LIB_PATH = path.join(__dirname, '..', '..');

export const joinPath = (...paths: string[]) => path.join(...paths);

export const buildPath = (value: string | undefined) =>
  value ? path.join(PROCESS_PATH, value) : PROCESS_PATH;

export const copy = async (source: string, target: string) =>
  await fsAsync.cp(source, target, { errorOnExist: true, recursive: true });

export const exists = (filePath: string) => fs.existsSync(filePath);

export const read = async (filePath: string) => await fsAsync.readFile(filePath, 'utf8');

export const write = async (filePath: string, content: any) =>
  await fsAsync.writeFile(filePath, content, { encoding: 'utf8' });

export const createFolder = async (folderPath: string) => await fsAsync.mkdir(folderPath);
