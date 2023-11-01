# Shieldbow ratelimiter

The ratelimiter package provides a rate limiter for the RIOT Games API.

It is not meant to be used by itself, instead use the `shieldbow` package.

---

If, for some reason, you want to use just the ratelimiter, it can be installed by itself using:

```bash
$ npm install @shieldbow/ratelimiter

$ yarn add @shieldbow/ratelimiter

$ pnpm add @shieldbow/ratelimiter
```

This package is part of the shieldbow library.

The shieldbow library allows you to easily interact with various aspects of the RIOT Games API
to develop third-party apps and services for League of Legends (LoL) and Teamfight Tactics (TFT).

This package is used to provide a rate limiter for the shieldbow library, which is capable of
handling the rate limits imposed by the RIOT Games API, and detects the rate limits automatically
from the headers, provides manual overrides, and more.

