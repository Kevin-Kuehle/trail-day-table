export type TDownload = {
  name: string;
  category: string;
  type: string;
  size: string;
  checked: boolean;
  sizeInBytes?: number;
};

type DataSizeType = {
  B: number;
  KB: number;
  MB: number;
  GB: number;
  TB: number;
};

const DATA_SIZE_TYPES = {
  B: 1,
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
  TB: 1024 * 1024 * 1024 * 1024,
};

export const sortDataSize = (data: TDownload[], sortType: string) => {
  const convertedData = data.map((item) => ({
    ...item,
    sizeInBytes: convertToBytes(item.size),
  }));

  if (sortType !== "ASC" && sortType !== "DESC") {
    throw new Error("Invalid sortType");
  }

  const sortedData = [...convertedData];
  if (sortType === "ASC") {
    return sortedData.sort((a: TDownload, b: TDownload) => {
      const sizeA = a.sizeInBytes ?? 0;
      const sizeB = b.sizeInBytes ?? 0;
      return sizeA - sizeB;
    });
  } else if (sortType === "DESC") {
    return sortedData.sort((a, b) => {
      const sizeA = a.sizeInBytes ?? 0;
      const sizeB = b.sizeInBytes ?? 0;
      return sizeB - sizeA;
    });
  }
};

export const convertToBytes = (size: string) => {
  if (!size) return 0;

  const unitMatch = size.match(/B|KB|MB|GB|TB/);

  if (!unitMatch) {
    throw new Error("Invalid unit in size string");
  }
  const unit = unitMatch[0];

  const num = Number(size.replace(unit, ""));
  if (isNaN(num)) {
    throw new Error("Invalid size");
  }

  return num * (DATA_SIZE_TYPES as DataSizeType)[unit as keyof DataSizeType];
};
