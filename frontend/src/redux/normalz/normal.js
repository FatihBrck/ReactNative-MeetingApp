export default function upsertReservationMap(existingMap, data) {
  // 1) roomid, dateString ve hours’ı al; hours yoksa boş dizi ata
  const { roomid, date: dateString, hours = [] } = data;

  // 2) ISO timestamp’ten sadece günü elde et (YYYY-MM-DD)
  const dt      = new Date(dateString);
  const dateKey = dt.toLocaleDateString('tr-TR').split('T')[0];

  // 3) Mevcut haritanın sığ kopyasını oluştur
  const nextMap = { ...existingMap };

  // 4) O adı altında kayıtlı tarih haritasını kopyala veya yeni oluştur
  const roomMap = { ...(nextMap[roomid] || {}) };

  // 5) O güne ait zaten eklenmiş saatler
  const existingHours = roomMap[dateKey] || [];

  // 6) Sadece benzersiz, yeni saatleri filtrele
  const uniqueNew = hours.filter(h => !existingHours.includes(h));

  // 7) Birleştir ve haritaya ata
  roomMap[dateKey]   = [...existingHours, ...uniqueNew];
  nextMap[roomid]    = roomMap;

  return nextMap;
}
