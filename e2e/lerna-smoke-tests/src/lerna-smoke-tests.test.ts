/**
 * These minimal smoke tests are here to ensure that we do not break assumptions on the lerna side
 * when making updates to nx or @nrwl/devkit.
 */

import {
  cleanupLernaWorkspace,
  newLernaWorkspace,
  runLernaCLI,
  tmpProjPath,
  updateJson,
} from '@nrwl/e2e/utils';

expect.addSnapshotSerializer({
  serialize(str: string) {
    return (
      str
        // Not all package managers print the package.json path in the output
        .replace(tmpProjPath(), '')
        .replace('/private', '')
        .replace('/packages/package-1', '')
        // We trim each line to reduce the chances of snapshot flakiness
        .split('\n')
        .map((r) => r.trim())
        .join('\n')
    );
  },
  test(val: string) {
    return val != null && typeof val === 'string';
  },
});

describe('Lerna Smoke Tests', () => {
  beforeAll(() => newLernaWorkspace());
  afterAll(() => cleanupLernaWorkspace());

  // `lerna repair` builds on top of `nx repair` and runs all of its generators
  describe('lerna repair', () => {
    // If this snapshot fails it means that nx repair generators are making assumptions which don't hold true for lerna workspaces
    it('should complete successfully on a new lerna workspace', async () => {
      expect(runLernaCLI(`repair`)).toMatchInlineSnapshot(`

        >  Lerna   No changes were necessary. This workspace is up to date!


      `);
    }, 1000000);
  });

  // `lerna run` delegates to the nx task runner behind the scenes
  describe('lerna run', () => {
    it('should complete successfully on a new lerna workspace', async () => {
      runLernaCLI('create package-1 -y');
      updateJson('packages/package-1/package.json', (json) => ({
        ...json,
        scripts: {
          ...(json.scripts || {}),
          'print-name': 'echo test-package-1',
        },
      }));

      expect(runLernaCLI(`run print-name`)).toMatchInlineSnapshot(`

        > package-1:print-name

        > package-1@0.0.0 print-name
        > echo test-package-1
        test-package-1



        >  Lerna (powered by Nx)   Successfully ran target print-name for project package-1



      `);
    }, 1000000);
  });
});
