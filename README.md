# Notion-Like Editor

A minimalistic Notion-like editor built with vanilla [TypeScript](https://typescriptlang.org/).

## Installation

1. Clone the repository and navigate into it:

```zsh
git clone https://github.com/power-f-GOD/notion-like-editor.git && cd notion-like-editor
```

2. Install dependencies:

```zsh
npm i -g pnpm && pnpm i
```

## Usage

1. Start the development server:

```zsh
pm dev
```

`Sidebar:` You can set an alias for `pnpm` in your `.zshrc` (on Mac) or `.bashrc` file by including this line `alias pm=pnpm` therein.

2. Navigate to [http://127.0.0.1:5173](http://127.0.0.1:5173) in your browser to see the app running.

## Tests

### Unit

The project uses [Vitest](https://vitest.dev/) as its unit test runner/framework.

To run the unit tests, simply run the following command:

```zsh
pm test
```

### e2e

The project uses [Playwright](https://playwright.dev/) as its e2e test runner/framework.

To run the e2e tests, simply run the following command:

```zsh
pm e2e
```

`PS.` See `package.json` for the rest test scripts.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
