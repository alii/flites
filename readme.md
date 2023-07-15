# flites

flites is an opinionated hot reloading development server for TypeScript applications. It replaces tools like `ts-node-dev` and `nodemon`. It is designed to be used in a development environment, and is not intended to be used in production.

Under the hood it uses esbuild, a modern build system for TypeScript, to compile your TypeScript files. This means it stays speedy even with larger projects and workspaces.
