import { logicTest1 } from "../utils/logicTest1";

describe("Logic Test 1", () => {
  it("should return 3", () => {
    const arr = [10, 20, 20, 10, 10, 30, 50, 10, 20];
    expect(logicTest1(arr)).toBe(3);
  });

  it("should return 6", () => {
    const arr = [6, 5, 2, 3, 5, 2, 2, 1, 1, 5, 1, 3, 3, 3, 5];
    expect(logicTest1(arr)).toBe(6);
  });

  it("should return 4", () => {
    const arr = [1, 1, 3, 1, 2, 1, 3, 3, 3, 3];
    expect(logicTest1(arr)).toBe(4);
  });
});
