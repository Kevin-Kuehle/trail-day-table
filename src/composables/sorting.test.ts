import { expect } from "@jest/globals";
import { sortDataSize, convertToBytes } from "./sorting";
import type { TDownload } from "./sorting";

describe("sorting", () => {
  it("converts size string to bytes", () => {
    expect(convertToBytes("1 KB")).toBe(1024);
    expect(convertToBytes("1 MB")).toBe(1024 * 1024);
    expect(convertToBytes("1 GB")).toBe(1024 * 1024 * 1024);
    expect(convertToBytes("1KB")).toBe(1024);
    expect(convertToBytes("1MB")).toBe(1024 * 1024);
    expect(convertToBytes("1GB")).toBe(1024 * 1024 * 1024);
  });

  it("throws error for invalid size string in convertToBytes", () => {
    expect(() => convertToBytes("1 invalid")).toThrow(
      "Invalid unit in size string"
    );
  });

  it("sorts TDownload array in ascending order by sizeInBytes", () => {
    const data: TDownload[] = [
      {
        name: "File1",
        category: "Cat1",
        type: "Type1",
        checked: true,
        size: "10 KB",
      },
      {
        name: "File2",
        category: "Cat2",
        type: "Type2",
        checked: false,
        size: "5 MB",
      },
      {
        name: "File3",
        category: "Cat3",
        type: "Type3",
        checked: true,
        size: "1 GB",
      },
      {
        name: "File4",
        category: "Cat4",
        type: "Type4",
        checked: false,
        size: "100 B",
      },
    ];
    const sorted = sortDataSize(data, "ASC");
    expect(sorted).toEqual([
      {
        name: "File4",
        category: "Cat4",
        type: "Type4",
        checked: false,
        size: "100 B",
        sizeInBytes: 100,
      },
      {
        name: "File1",
        category: "Cat1",
        type: "Type1",
        checked: true,
        size: "10 KB",
        sizeInBytes: 10240,
      },
      {
        name: "File2",
        category: "Cat2",
        type: "Type2",
        checked: false,
        size: "5 MB",
        sizeInBytes: 5242880,
      },
      {
        name: "File3",
        category: "Cat3",
        type: "Type3",
        checked: true,
        size: "1 GB",
        sizeInBytes: 1073741824,
      },
    ]);
  });
});
