const Sequencer = require('@jest/test-sequencer').default;

class ShieldbowSequencer extends Sequencer {
  sort(tests) {
    const DRAGONS = ['champion', 'item', 'rune', 'spell'];
    const processed = super.sort(tests);
    const sorter = (a, b) => {
      if (DRAGONS.some((d) => a.path.includes(d))) return -1;
      else if (DRAGONS.some((d) => b.path.includes(d))) return 1;
      else return 0;
    };
    if (Array.isArray(processed)) return processed.sort(sorter);
    else return processed.then((tests) => tests.sort(sorter));
  }
}

module.exports = ShieldbowSequencer;
