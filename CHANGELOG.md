# Changelog

本项目的所有重要变更都会记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### Changed

- **@trionesdev/auth-react**：将 `react`、`react-dom` peerDependencies 升级至 `^19.2.7`
- **@trionesdev/react-router-auth**：将 `react`、`react-dom` peerDependencies 升级至 `^19.2.7`，并将 `react-router` 升级至 `^8.1.0`
- **react-demo**：升级 React 至 `^19.2.7`、react-router 至 `8.1.0`；`RouterProvider` 改为从 `react-router/dom` 导入（React Router v8 要求）
- 根目录 `preversion` 脚本由 `yarn run build` 改为 `pnpm run build`

## [0.0.1-beta.14] - 2026-07-01

### Added

- **@trionesdev/auth-react**：`AuthenticationProvider` 支持泛型类型参数，实现类型安全的用户信息管理
- **@trionesdev/auth-react**：`useAuthentication` Hook 支持泛型返回值

### Changed

- **@trionesdev/auth-react**：重构认证组件，改进状态管理和类型安全
- **@trionesdev/auth-react**：调整认证组件代码格式
- **react-demo**：更新认证相关组件和示例应用

## [0.0.1-beta.13] - 2026-01-27

### Fixed

- **@trionesdev/auth-react**：退出登录时清除所有权限

## [0.0.1-beta.12] - 2026-01-27

### Fixed

- **@trionesdev/auth-react**：退出登录时清除所有权限

## [0.0.1-beta.11] 及更早版本

- 初始版本发布，包含认证、鉴权及 React Router 集成能力
