export default function ByRoomName(existingMap, data) {
  const {
    roomName,
    hours    = [],
    audience = []
  } = data;

  const nextMap = { ...existingMap };

  const existingEntry = nextMap[roomName] || { hours: [], audience: [] };

  const mergedHours = [
    ...existingEntry.hours,
    ...hours
  ];
  const mergedAudience = [
    ...existingEntry.audience,
    ...audience
  ];

  nextMap[roomName] = {
    hours:    mergedHours,
    audience: mergedAudience
  };

  return nextMap;
}

