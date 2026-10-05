import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const contractsRoot = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(contractsRoot, "..");
const packageMetadata = JSON.parse(fs.readFileSync(path.join(repositoryRoot, "package.json"), "utf8"));
const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "psdc-contract-bundle-"));

try {
  const manifests = [];
  for (const run of ["run-a", "run-b"]) {
    const outputRoot = path.join(temporaryRoot, run);
    const result = spawnSync(process.execPath, [path.join(contractsRoot, "build-contract-bundle.mjs"), outputRoot], {
      cwd: repositoryRoot,
      encoding: "utf8"
    });
    if (result.status !== 0) throw new Error(`Bundle build ${run} failed: ${result.stderr || result.stdout}`);
    const bundleRoot = path.join(outputRoot, `${packageMetadata.name}-${packageMetadata.version}`);
    manifests.push(fs.readFileSync(path.join(bundleRoot, "manifest.json"), "utf8"));
  }
  if (manifests[0] !== manifests[1]) throw new Error("Two clean bundle builds produced different manifests");
  const manifest = JSON.parse(manifests[0]);
  console.log(`Bundle reproducibility passed: ${manifest.files.length} files, content root ${manifest.contentRoot}.`);
} finally {
  const resolvedTemporaryRoot = path.resolve(temporaryRoot);
  const resolvedSystemTemp = path.resolve(os.tmpdir());
  if (!resolvedTemporaryRoot.startsWith(resolvedSystemTemp + path.sep) || !path.basename(resolvedTemporaryRoot).startsWith("psdc-contract-bundle-")) {
    throw new Error(`Refusing to remove unexpected temporary path: ${resolvedTemporaryRoot}`);
  }
  fs.rmSync(resolvedTemporaryRoot, { recursive: true, force: true });
}
