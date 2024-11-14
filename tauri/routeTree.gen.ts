/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './pages/__root'
import { Route as SettingIndexImport } from './pages/setting/index'
import { Route as SettingUiImport } from './pages/setting/ui'
import { Route as SettingKeymapImport } from './pages/setting/keymap'
import { Route as SettingGeneralImport } from './pages/setting/general'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./pages/index.lazy').then((d) => d.Route))

const SettingIndexRoute = SettingIndexImport.update({
  id: '/setting/',
  path: '/setting/',
  getParentRoute: () => rootRoute,
} as any)

const SettingUiRoute = SettingUiImport.update({
  id: '/setting/ui',
  path: '/setting/ui',
  getParentRoute: () => rootRoute,
} as any)

const SettingKeymapRoute = SettingKeymapImport.update({
  id: '/setting/keymap',
  path: '/setting/keymap',
  getParentRoute: () => rootRoute,
} as any)

const SettingGeneralRoute = SettingGeneralImport.update({
  id: '/setting/general',
  path: '/setting/general',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/setting/general': {
      id: '/setting/general'
      path: '/setting/general'
      fullPath: '/setting/general'
      preLoaderRoute: typeof SettingGeneralImport
      parentRoute: typeof rootRoute
    }
    '/setting/keymap': {
      id: '/setting/keymap'
      path: '/setting/keymap'
      fullPath: '/setting/keymap'
      preLoaderRoute: typeof SettingKeymapImport
      parentRoute: typeof rootRoute
    }
    '/setting/ui': {
      id: '/setting/ui'
      path: '/setting/ui'
      fullPath: '/setting/ui'
      preLoaderRoute: typeof SettingUiImport
      parentRoute: typeof rootRoute
    }
    '/setting/': {
      id: '/setting/'
      path: '/setting'
      fullPath: '/setting'
      preLoaderRoute: typeof SettingIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/setting/general': typeof SettingGeneralRoute
  '/setting/keymap': typeof SettingKeymapRoute
  '/setting/ui': typeof SettingUiRoute
  '/setting': typeof SettingIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/setting/general': typeof SettingGeneralRoute
  '/setting/keymap': typeof SettingKeymapRoute
  '/setting/ui': typeof SettingUiRoute
  '/setting': typeof SettingIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/setting/general': typeof SettingGeneralRoute
  '/setting/keymap': typeof SettingKeymapRoute
  '/setting/ui': typeof SettingUiRoute
  '/setting/': typeof SettingIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/setting/general'
    | '/setting/keymap'
    | '/setting/ui'
    | '/setting'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/setting/general' | '/setting/keymap' | '/setting/ui' | '/setting'
  id:
    | '__root__'
    | '/'
    | '/setting/general'
    | '/setting/keymap'
    | '/setting/ui'
    | '/setting/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  SettingGeneralRoute: typeof SettingGeneralRoute
  SettingKeymapRoute: typeof SettingKeymapRoute
  SettingUiRoute: typeof SettingUiRoute
  SettingIndexRoute: typeof SettingIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  SettingGeneralRoute: SettingGeneralRoute,
  SettingKeymapRoute: SettingKeymapRoute,
  SettingUiRoute: SettingUiRoute,
  SettingIndexRoute: SettingIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/setting/general",
        "/setting/keymap",
        "/setting/ui",
        "/setting/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/setting/general": {
      "filePath": "setting/general.tsx"
    },
    "/setting/keymap": {
      "filePath": "setting/keymap.tsx"
    },
    "/setting/ui": {
      "filePath": "setting/ui.tsx"
    },
    "/setting/": {
      "filePath": "setting/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
