import { FileData, ProjectFileMap } from '../config/project-graph';
import {
  createProjectRootMappingsFromProjectConfigurations,
  findProjectForPath,
} from './utils/find-project-for-path';
import { ProjectsConfigurations } from '../config/workspace-json-project-json';

export function createProjectFileMap(
  projectsConfigurations: ProjectsConfigurations,
  allWorkspaceFiles: FileData[]
): { projectFileMap: ProjectFileMap; allWorkspaceFiles: FileData[] } {
  const projectFileMap: ProjectFileMap = {};
  const projectRootMappings =
    createProjectRootMappingsFromProjectConfigurations(
      projectsConfigurations.projects
    );

  for (const projectName of Object.keys(projectsConfigurations.projects)) {
    projectFileMap[projectName] ??= [];
  }
  for (const f of allWorkspaceFiles) {
    const matchingProjectFiles =
      projectFileMap[findProjectForPath(f.file, projectRootMappings)];
    if (matchingProjectFiles) {
      matchingProjectFiles.push(f);
    }
  }
  return { projectFileMap, allWorkspaceFiles };
}

export function updateProjectFileMap(
  projectsConfigurations: ProjectsConfigurations,
  projectFileMap: ProjectFileMap,
  allWorkspaceFiles: FileData[],
  updatedFiles: Map<string, string>,
  deletedFiles: string[]
): { projectFileMap: ProjectFileMap; allWorkspaceFiles: FileData[] } {
  const projectRootMappings =
    createProjectRootMappingsFromProjectConfigurations(
      projectsConfigurations.projects
    );

  for (const f of updatedFiles.keys()) {
    const matchingProjectFiles =
      projectFileMap[findProjectForPath(f, projectRootMappings)] ?? [];
    if (matchingProjectFiles) {
      const fileData: FileData = matchingProjectFiles.find((t) => t.file === f);
      if (fileData) {
        fileData.hash = updatedFiles.get(f);
      } else {
        matchingProjectFiles.push({
          file: f,
          hash: updatedFiles.get(f),
        });
      }
    }

    const fileData: FileData = allWorkspaceFiles.find((t) => t.file === f);
    if (fileData) {
      fileData.hash = updatedFiles.get(f);
    } else {
      allWorkspaceFiles.push({
        file: f,
        hash: updatedFiles.get(f),
      });
    }
  }

  for (const f of deletedFiles) {
    const matchingProjectFiles =
      projectFileMap[findProjectForPath(f, projectRootMappings)] ?? [];
    if (matchingProjectFiles) {
      const index = matchingProjectFiles.findIndex((t) => t.file === f);
      if (index > -1) {
        matchingProjectFiles.splice(index, 1);
      }
    }
    const index = allWorkspaceFiles.findIndex((t) => t.file === f);
    if (index > -1) {
      allWorkspaceFiles.splice(index, 1);
    }
  }
  return { projectFileMap, allWorkspaceFiles };
}
