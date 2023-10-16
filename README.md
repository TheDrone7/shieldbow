# shieldbow (v2)

An all-purpose, easy-to-use API wrapper for the league of legends API
<div align="center">
	<br />
	<p>
		<a href="https://www.npmjs.com/package/shieldbow"><img src="https://img.shields.io/npm/v/shieldbow.svg?maxAge=3600&style=for-the-badge" alt="npm version" /></a>
		<a href="https://www.npmjs.com/package/shieldbow"><img src="https://img.shields.io/npm/dt/shieldbow.svg?maxAge=3600&style=for-the-badge" alt="npm downloads" /></a>
		<a href="https://github.com/TheDrone7/shieldbow/actions"><img src="https://img.shields.io/github/actions/workflow/status/TheDrone7/shieldbow/nodejs-ci.yml?branch=main&color=%2322b822&style=for-the-badge" alt="Tests status" /></a>
		<a href="https://codecov.io/gh/TheDrone7/shieldbow"><img src="https://img.shields.io/codecov/c/gh/TheDrone7/shieldbow?style=for-the-badge" alt="code coverage" /></a>
	</p>
</div>

> The code in the repository is for the unpublished, work in progress version (v3) of shieldbow.

> The published version (v2) is available for use on npm.

---

### Installing

Node.JS 16 or higher is recommended.

Install using 
```
npm install shieldbow

yarn add shieldbow

pnpm add shieldbow
```

See the [documentation](https://thedrone7.github.io/shieldbow/) to learn more!

---

# @shieldbow/web (v1) - The web-friendly version of shieldbow

An all-purpose, easy-to-use client for the league of legends API.
This is safe to use on the frontend, requires no API key, but is less powerful than the full library.

This is part of Shieldbow (v3) - a work in progress.

There are no shieldbow-web specific documentation (yet), but is fairly intuitive and similar to shieldbow (v2) on the surface.
The documentation will be available upon completion of shieldbow (v3).

To install shieldbow-web, use (depending on your package manager)
```bash
npm install @shieldbow/web axios

yarn add @shieldbow/web axios

pnpm add @shieldbow/web axios
```

### NOTE

In [`@shieldbow/web`](https://npmjs.com/package/@shieldbow/web), the `axios` package is an optional dependency.

This means that you can use any other HTTP client too! However, if you do not provide a HTTP client,
shieldbow will try to default to `axios` (if it is installed).

If it is not installed, shieldbow will throw an error.

You can provide your own HTTP client by passing it to the `Client` initialization

Here is an example with the built-in JavaScript fetch API (which is available in the browser)
```ts

// Typescript
client.initialize({
	// ... other options,
	fetchMethod: <T>(url: string) => fetch(url).then(res => {
		if (!res.ok) throw new Error(res.statusText);
		if (res.headers.get('content-type')?.includes('application/json')) return res.json() as Promise<T>;
		else return res.text() as unknown as Promise<T>;
	});
})

// Javascript
client.initialize({
	// ... other options,
	fetchMethod: function (url) {
		return fetch(url).then(res => {
			if (!res.ok) throw new Error(res.statusText);
			if (res.headers.get('content-type')?.includes('application/json')) return res.json();
			else return res.text();
		});
	}
})
```
```

---
