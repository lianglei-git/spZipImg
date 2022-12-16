import pngquant from "pngquant-bin";
import pkg from "fs-extra";
import { execFile } from "node:child_process";
import _path from "path";
const { readdir, ensureDirSync, lstatSync, existsSync, rmSync } = pkg;

const extsReg = /\.(png|jpe?g|gif|svg)$/;

const copyZip = _path.join(process.cwd(), "./spcopy");

if (existsSync(copyZip)) {
  rmSync(copyZip, { recursive: true });
}
async function run(path, dirPath = "", next = () => []) {
  await readdir(path, async (err, files) => {
    for (let i = 0; i < files.length; i++) {
      const p = _path.join(path, files[i]);
      if (lstatSync(p).isDirectory()) {
        ensureDirSync(
          copyZip + (dirPath ? "/" + dirPath : dirPath) + "/" + files[i]
        );
        await run(p, (dirPath ? dirPath + "/" : dirPath) + files[i]);
      } else {
        const { ext } = _path.parse(p);
        if (extsReg.test(ext)) {
          await execFile(
            pngquant,
            ["-o", copyZip + "/" + dirPath + "/" + files[i], p],
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
      }
    }
  });
}

export default run;
