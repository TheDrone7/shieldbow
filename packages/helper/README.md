# Shieldbow Helper

Shieldbow helper is a script to generate TypeScript interfaces for the raw data received from the RIOT Games API. To use it,

1. Create a new file called `.env` in the helper directory.
2. Add the following line to the `.env` file:
   ```
   API_KEY=your_api_key_here
   ```
   Replace `your_api_key_here` with your actual RIOT API key.
3. Run the script using Node.js:
   ```bash
    pnpm start
   ```

The script will create a new directory called `output` and generate the following files:
- `structures/`: Contain json files with the data structures broken down from the received data.
- `types/`: Contain generated TypeScript interfaces for the data structures.
- `extras/`: Some extra files for learning about match structures such as timeline events, raw match data, etc.

The tool should generate the structures and types for the following data:
- from Data Dragon
  - Champion
  - Item
  - Rune trees
  - Summoner spells
- from the League of Legends API
  - Account V1
  - Champion Mastery V4
  - League V4
  - Lol Status V4
  - Summoner V4
  - Lol Challenges V1
  - Match V5
  - Spectator V5

P.S. The generated types are not perfect and may require some manual adjustments. The goal is to provide a starting point for interfaces used in the actual code. Additionally, the generated files are ignored and not included in the repository.