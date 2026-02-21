export default function ByUserName(existingMap, data) {
  const {
    userName: userName,
    hours    = [],
    audience = []
  } = data;

  const nextMap = { ...existingMap };

  const existingEntry = nextMap[userName] || { hours: [], audience: [] };

  const mergedHours = [
    ...existingEntry.hours,
    ...hours
  ];
  const mergedAudience = [
    ...existingEntry.audience,
    ...audience
  ];

  nextMap[userName] = {
    hours:    mergedHours,
    audience: mergedAudience
  };

  return nextMap;
}