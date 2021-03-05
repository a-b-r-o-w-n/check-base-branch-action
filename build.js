const esbuild = require("esbuild");
const fs = require("fs-extra");

async function clean() {
  await fs.emptyDir("./lib");
}

async function build() {
  await esbuild.build({
    entryPoints: ["./src/check-base-branch.ts"],
    outdir: "lib",
    bundle: true,
    platform: "node",
    target: ["es2015"],
  });
}

clean()
  .then(build)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
