// All event times are anchored to India Standard Time (+05:30), never the guest's clock.
export const IST = "+05:30";

export const couple = { a: "Aarav", b: "Anaya", initials: "A · A" };

export const wedding = {
  iso: `2027-02-14T10:30:00${IST}`,
  dateLabel: "Sunday, 14 February 2027",
  timeLabel: "10:30 AM IST · Muhurtham",
};

export const venue = {
  name: "The Grand Pavilion",
  address: "Temple Road, Chennai, Tamil Nadu",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Grand+Pavilion+Chennai",
};

export const programme = [
  { name: "Mehendi", iso: `2027-02-13T16:00:00${IST}`, note: "Henna, music & marigolds" },
  { name: "Muhurtham", iso: `2027-02-14T10:30:00${IST}`, note: "The sacred auspicious hour" },
  { name: "Wedding", iso: `2027-02-14T11:15:00${IST}`, note: "Saptapadi & blessings" },
  { name: "Reception", iso: `2027-02-14T19:00:00${IST}`, note: "Dinner under the lamps" },
];

export function formatIST(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function countdownParts(targetIso: string, nowMs: number) {
  const diff = Math.max(0, new Date(targetIso).getTime() - nowMs);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}
