# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

to-markdown-cli is a TypeScript CLI tool that converts HTML to Markdown using the Turndown library. It supports input from files, stdin, or clipboard, with optional GitHub Flavored Markdown support.

## Development Commands

### Building and Development
- `npm run build` - Compile TypeScript to JavaScript in `/dist` directory
- `npm run watch` - Build in watch mode for development
- `npm run prepare` - Runs build automatically before publishing

### Testing
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run testWithCoverage` - Run tests with coverage report
- `npm run test:tofile` - Test the CLI by converting test HTML file to markdown

### Code Quality
- `npm run lint` - Run ESLint on TypeScript source files
- `npm run prettier:write` - Format code with Prettier
- `npm run prettier:list` - Check for formatting issues
- `npm run validate` - Build the project (used in pre-commit hooks)

## Architecture

### Core Components

**Main Entry Point (`src/html2md.ts`)**
- CLI argument parsing using Commander.js
- Handles stdin/TTY detection for different input modes
- Manages the flow between input parsing and output writing

**Flag Parsing (`src/lib/parse-flags.ts`)**
- Processes CLI options and determines input source (file, clipboard, stdin)
- Handles clipboard operations using clipboardy library
- Returns standardized options object

**Output Writing (`src/lib/write-out.ts`)**
- Converts HTML to Markdown using Turndown service
- Supports standard and GitHub Flavored Markdown modes
- Handles multiple output destinations (stdout, file, clipboard)

### Key Libraries
- **Turndown**: Core HTML to Markdown conversion
- **turndown-plugin-gfm**: GitHub Flavored Markdown support
- **Commander.js**: CLI argument parsing
- **clipboardy**: System clipboard integration

## Build System

- **TypeScript**: ESNext target with ES modules
- **Jest**: Testing with ts-jest for TypeScript support
- **ESLint**: Code linting with TypeScript-specific rules
- **Prettier**: Code formatting

## Testing Strategy

The project uses Jest with TypeScript support:
- Unit tests for core functions (`parse-flags.test.ts`, `write-out.test.ts`)
- Mock filesystem testing using mock-fs
- Shell integration tests (`shell.test.sh`)
- Test files located in `__tests__/` directory

## Configuration Notes

- Uses ES modules (`"type": "module"` in package.json)
- TypeScript compiled to `dist/` with source maps
- Strict TypeScript configuration with comprehensive error checking
- Pre-commit hooks run validation and lint-staged formatting
- CI runs on both Ubuntu with and without xsel for clipboard testing

## CLI Input/Output Modes

The tool supports multiple input/output combinations:
1. File input → stdout/file output
2. Clipboard input → stdout/file/clipboard output
3. Stdin input → stdout/file output

Clipboard functionality requires a valid display environment (may not work in headless systems).
- never edit package.json dependency versions manually. Allways use the `npm install <...>` command