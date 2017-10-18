const { FuseBox, VueComponentPlugin, CSSPlugin, WebIndexPlugin, Sparky, QuantumPlugin, EnvPlugin } = require("fuse-box");

const isProduction = process.env.NODE_ENV === "production";
const isDev = !isProduction;
const homeDir = "src";
const outDir = "dist";
const fuseCache = ".fusebox";
const jsBundleName = "bundle";
const group = "bundle.css";

Sparky.task("default", ["clean"], () => {
    const fsbx = new FuseBox({
        homeDir,
        sourceMaps: isDev,
        cache: isDev,
        useTypescriptCompiler: true,
        experimentalFeatures: true,
        polyfillNonStandardDefaultUsage: true,
        output: `${outDir}/$name.js`,
        log: true,
        plugins: [
            VueComponentPlugin({
                style: [
                    CSSPlugin({
                        group,
                        inject: false,
                        minify: isProduction,
                        outFile: `${outDir}/${group}`
                    })
                ]
            }),
            WebIndexPlugin({
                template: `${homeDir}/index.html`
            }),
            ...isProduction
                ? [QuantumPlugin({
                    treeshake: true,
                    bakeApiIntoBundle: jsBundleName,
                    removeExportsInterop: true,
                    uglify: true
                })]
                : []
        ]
    });

    if (isDev) {
        fsbx.dev({
            port: 3000
        });
    }

    const bundle = fsbx
        .bundle(jsBundleName)
        .instructions(`> app.ts`);

    if (isDev) {
        bundle
            .watch()
            .hmr({ reload: true });
    }

    return fsbx.run();
});

Sparky.task("clean", () => {
    return Promise.all([
        Sparky
            .src(outDir)
            .clean(outDir)
            .exec(),
        Sparky
            .src(`${fuseCache}`)
            .clean(`${fuseCache}`)
            .exec()
    ]);
});