import {
  request,
  BASE_REGIONAL,
  ARAM_MATCH_ID,
  CHERRY_MATCH_ID,
  RANKED_MATCH_ID,
  SWIFTPLAY_MATCH_ID,
  breakdown,
  cleanStructure,
  writeToFile,
  typeOut,
  Structure
} from 'utilities';

export async function matchV5() {
  let classicStructure: Structure = {};
  let aramStructure: Structure = {};
  let swiftplayStructure: Structure = {};
  let cherryStructure: Structure = {};

  let classicTimelineStructure: Structure = {};
  let aramTimelineStructure: Structure = {};
  let swiftplayTimelineStructure: Structure = {};
  let cherryTimelineStructure: Structure = {};

  // Match V5 by Match ID
  const classicUrl = `${BASE_REGIONAL}/lol/match/v5/matches/${RANKED_MATCH_ID}`;
  const aramUrl = `${BASE_REGIONAL}/lol/match/v5/matches/${ARAM_MATCH_ID}`;
  const swiftplayUrl = `${BASE_REGIONAL}/lol/match/v5/matches/${SWIFTPLAY_MATCH_ID}`;
  const cherryUrl = `${BASE_REGIONAL}/lol/match/v5/matches/${CHERRY_MATCH_ID}`;

  const classicResponse = await request(classicUrl).catch((err) => {
    console.error(err);
    return undefined;
  });
  const aramResponse = await request(aramUrl).catch((err) => {
    console.error(err);
    return undefined;
  });
  const swiftplayResponse = await request(swiftplayUrl).catch((err) => {
    console.error(err);
    return undefined;
  });
  const cherryResponse = await request(cherryUrl).catch((err) => {
    console.error(err);
    return undefined;
  });

  if (classicResponse && aramResponse && swiftplayResponse && cherryResponse) {
    classicStructure = breakdown(classicResponse, 'matchId', classicStructure);
    aramStructure = breakdown(aramResponse, 'matchId', aramStructure);
    swiftplayStructure = breakdown(swiftplayResponse, 'matchId', swiftplayStructure);
    cherryStructure = breakdown(cherryResponse, 'matchId', cherryStructure);

    console.log('Match V5 matches by ID parsed successfully.');
  } else return;

  // Save the structure
  writeToFile('structures/api/match/classic.json', JSON.stringify(cleanStructure(classicStructure), null, 2));
  writeToFile('structures/api/match/aram.json', JSON.stringify(cleanStructure(aramStructure), null, 2));
  writeToFile('structures/api/match/swiftplay.json', JSON.stringify(cleanStructure(swiftplayStructure), null, 2));
  writeToFile('structures/api/match/cherry.json', JSON.stringify(cleanStructure(cherryStructure), null, 2));

  // Generate types
  typeOut('structures/api/match/classic.json', 'classicMatch', 'the API');
  typeOut('structures/api/match/aram.json', 'aramMatch', 'the API');
  typeOut('structures/api/match/swiftplay.json', 'swiftMatch', 'the API');
  typeOut('structures/api/match/cherry.json', 'cherryMatch', 'the API');

  // Match V5 Timeline by Match ID
  const classicTimelineUrl = `${BASE_REGIONAL}/lol/match/v5/matches/${RANKED_MATCH_ID}/timeline`;
  const aramTimelineUrl = `${BASE_REGIONAL}/lol/match/v5/matches/${ARAM_MATCH_ID}/timeline`;
  const cherryTimelineUrl = `${BASE_REGIONAL}/lol/match/v5/matches/${CHERRY_MATCH_ID}/timeline`;
  const swiftplayTimelineUrl = `${BASE_REGIONAL}/lol/match/v5/matches/${SWIFTPLAY_MATCH_ID}/timeline`;
  const classicTimelineResponse = await request(classicTimelineUrl).catch((err) => {
    console.error(err);
    return undefined;
  });
  const aramTimelineResponse = await request(aramTimelineUrl).catch((err) => {
    console.error(err);
    return undefined;
  });
  const swiftplayTimelineResponse = await request(swiftplayTimelineUrl).catch((err) => {
    console.error(err);
    return undefined;
  });
  const cherryTimelineResponse = await request(cherryTimelineUrl).catch((err) => {
    console.error(err);
    return undefined;
  });
  if (classicTimelineResponse && aramTimelineResponse && swiftplayTimelineResponse && cherryTimelineResponse) {
    classicTimelineStructure = breakdown(classicTimelineResponse, 'matchId', classicTimelineStructure);
    aramTimelineStructure = breakdown(aramTimelineResponse, 'matchId', aramTimelineStructure);
    swiftplayTimelineStructure = breakdown(swiftplayTimelineResponse, 'matchId', swiftplayTimelineStructure);
    cherryTimelineStructure = breakdown(cherryTimelineResponse, 'matchId', cherryTimelineStructure);

    console.log('Match V5 timelines by ID parsed successfully.');
  }

  // Save the structure
  writeToFile(
    'structures/api/match/classicTimeline.json',
    JSON.stringify(cleanStructure(classicTimelineStructure), null, 2)
  );
  writeToFile('structures/api/match/aramTimeline.json', JSON.stringify(cleanStructure(aramTimelineStructure), null, 2));
  writeToFile(
    'structures/api/match/swiftplayTimeline.json',
    JSON.stringify(cleanStructure(swiftplayTimelineStructure), null, 2)
  );
  writeToFile(
    'structures/api/match/cherryTimeline.json',
    JSON.stringify(cleanStructure(cherryTimelineStructure), null, 2)
  );

  // Generate types
  typeOut('structures/api/match/classicTimeline.json', 'classicMatchTimeline', 'the API');
  typeOut('structures/api/match/aramTimeline.json', 'aramMatchTimeline', 'the API');
  typeOut('structures/api/match/swiftplayTimeline.json', 'swiftMatchTimeline', 'the API');
  typeOut('structures/api/match/cherryTimeline.json', 'cherryMatchTimeline', 'the API');
  console.log('Match V5 types generated successfully.\n');
}
