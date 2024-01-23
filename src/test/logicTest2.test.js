import { logicTest2 } from "../utils/logicTest2";

describe("Logic Test 2", () => {
  it("should return 5", () => {
    const text = "Saat meng*ecat tembok, Agung dib_antu oleh Raihan.";
    expect(logicTest2(text)).toBe(5);
  });

  it("should return 3", () => {
    const text = "Berapa u(mur minimal[ untuk !mengurus ktp?";
    expect(logicTest2(text)).toBe(3);
  });

  it("should return 4", () => {
    const text = "Masing-masing anak mendap(atkan uang jajan ya=ng be&rbeda.";
    expect(logicTest2(text)).toBe(4);
  });
});
