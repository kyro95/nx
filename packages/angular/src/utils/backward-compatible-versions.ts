import * as latestVersions from './versions';

type SupportedVersions = 'angularV14';
export type PackageVersionNames = Exclude<
  keyof typeof latestVersions,
  'nxVersion'
>;
export type PackageVersions = Record<PackageVersionNames, string>;

export const backwardCompatibleVersions: Record<
  SupportedVersions,
  PackageVersions
> = {
  angularV14: {
    angularVersion: '~14.2.0',
    angularDevkitVersion: '~14.2.0',
    ngPackagrVersion: '~14.2.0',
    ngrxVersion: '~14.0.0',
    rxjsVersion: '~7.5.0',
    zoneJsVersion: '~0.11.4',
    angularJsVersion: '1.7.9',
    tsLibVersion: '^2.3.0',
    ngUniversalVersion: '~14.2.0',
    corsVersion: '~2.8.5',
    expressVersion: '~4.18.2',
    moduleFederationNodeVersion: '^0.10.1',
    angularEslintVersion: '~14.0.4',
    tailwindVersion: '^3.0.2',
    postcssVersion: '^8.4.5',
    postcssImportVersion: '~14.1.0',
    postcssPresetEnvVersion: '~7.5.0',
    postcssUrlVersion: '~10.1.3',
    autoprefixerVersion: '^10.4.0',
    tsNodeVersion: '10.9.1',
    jestPresetAngularVersion: '~12.2.3',
    protractorVersion: '~7.0.0',
    karmaVersion: '~6.4.0',
    karmaChromeLauncherVersion: '~3.1.0',
    karmaCoverageVersion: '~2.2.0',
    karmaJasmineVersion: '~5.1.0',
    karmaJasmineHtmlReporterVersion: '~2.0.0',
    jasmineCoreVersion: '~4.2.0',
    jasmineSpecReporterVersion: '~7.0.0',
    typesJasmineVersion: '~4.0.0',
    typesJasminewd2Version: '~2.0.3',
    typesNodeVersion: '16.11.7',
    jasmineMarblesVersion: '^0.9.2',
  },
};
