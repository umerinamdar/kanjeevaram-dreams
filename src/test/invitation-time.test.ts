import { describe, expect, it } from "vitest";
import { countdownParts, wedding } from "@/components/invitation/data";

describe("wedding time is anchored to +05:30", () => {
  it("muhurtham is 05:00 UTC on 14 Feb 2027", () => {
    expect(new Date(wedding.iso).toISOString()).toBe("2027-02-14T05:00:00.000Z");
  });
  it("countdown is exactly one day out 24h before, regardless of guest clock", () => {
    const now = Date.parse("2027-02-13T05:00:00Z");
    expect(countdownParts(wedding.iso, now)).toEqual({ days: 1, hours: 0, minutes: 0, seconds: 0 });
  });
});
