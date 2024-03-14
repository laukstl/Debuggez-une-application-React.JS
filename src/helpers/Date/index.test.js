import { getMonth } from "./index";

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("the function return janvier for 2022-01-01 as date", () => {
            const dateTest = "2022-01-01";
            const testFunction = () => getMonth(new Date(dateTest));
            expect(testFunction()).toBe("janvier");
        });
        it("the function return juillet for 2022-07-08 as date", () => {
            const dateTest = "2022-07-08";
            const testFunction = () => getMonth(new Date(dateTest));
            expect(testFunction()).toBe("juillet");
        });
    });
})

