## Contributing to Shieldbow
---

First of all, thanks a ton for using and wanting to contribute to shieldbow. 

If you have any questions, feel free to start a new [discussion](https://github.com/TheDrone7/shieldbow/discussions/new).

If you have discovered a bug, or a vulnerability, please create a [bug report issue])(https://github.com/TheDrone7/shieldbow/issues/new?assignees=TheDrone7&labels=bug&template=bug_report.md&title=%5BBUG%5D)
or if you feel like the library is missing a feature, create a new [feature request](https://github.com/TheDrone7/shieldbow/issues/new?assignees=TheDrone7&labels=enhancement&template=feature_request.md&title=).

Do you want to make contributions to the code yourself? Head on to the next section to learn how.

---

### Prerequisite knowledge

- [Node.JS](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [REST API](https://restfulapi.net/)
- [RIOT API](https://developer.riotgames.com/)
- [Unit testing with Jest](https://jestjs.io/)
- [TSDoc](https://tsdoc.org/)


---

### Code contribution

[Fork the repository](https://github.com/TheDrone7/shieldbow/fork) and make appropriate changes.

Before moving forward however, please ensure the following.

1. You have added appropriate TSDoc definitions for any new classes, functions, interfaces, variables, type aliases you may have created.
2. Before moving further, be sure to run the following commands in your shell

```shell
$ npm run format && npm run lint
```
to ensure code quality.

```shell
$ npm run build
```
to make sure there are no typescript issues.

Next run
```ts
$ npm run extract && npm run document
```
to generate the docs. This also ensures that you have exported everything properly and that you have used proper TSDoc syntax for generating the API reference.

Before moving forward, go to [Riot developer portal](https://developer.riotgames.com/) and grab a development API key.
In the root directory (with package.json), create a new file called `.env` and inside it, place the following line.
```
riot_api_key="DEVELOPER_API_KEY"
```
and replace `DEVELOPER_API_KEY` with your developer API Key.

Finally, if you have added support for some formerly unsupported API endpoint, or added data fetching from a new source,
make sure that the tests include a test for checking the proper functioning of this new API endpoint or source.

And now, run the command
```shell
$ npm test
```

The test coverage should be more than 90% optimally.

When this is all done, you can finally push all these changes to your fork and create a new PR with the appropriate changes and descriptions.
