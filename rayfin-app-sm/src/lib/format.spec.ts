import { describe, expect, it } from "vitest";

import {
    formatCompactCurrency,
    formatPercent,
    formatWholeNumber,
} from "@/lib/format";

describe("dashboard formatters", () => {
    it("renders amounts without decimal points", () => {
        expect(formatCompactCurrency(118608.75)).toBe("$119K");
        expect(formatCompactCurrency(0)).toBe("$0");
    });

    it("renders whole numbers with grouping", () => {
        expect(formatWholeNumber(1234.8)).toBe("1,235");
    });

    it("keeps one decimal place available for rates", () => {
        expect(formatPercent(0.1023)).toBe("10.2%");
    });
});
