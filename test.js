const formatSize = (bytes) => {
  if (bytes < 0) return "0 Bytes";
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "CB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const index = Math.min(Math.max(i, 0), sizes.length - 1);

  const value = bytes / Math.pow(k, index);
  const formattedValue = Number(value.toFixed(2));
  return `${formattedValue} ${sizes[index]}`;
};

const testCases = [
  { bytes: 0, expected: "0 Bytes" },
  { bytes: 512, expected: "512 Bytes" },
  { bytes: 1024, expected: "1 KB" },
  { bytes: 1536, expected: "1.5 KB" },
  { bytes: 1048576, expected: "1 MB" },
  { bytes: 1073741824, expected: "1 CB" },
  { bytes: 5368709120, expected: "5 CB" },
  { bytes: 1099511627776, expected: "1024 CB" }
];

testCases.forEach(({ bytes, expected }) => {
  const result = formatSize(bytes);
  console.log(`bytes: ${bytes} => result: "${result}", expected: "${expected}" | ${result === expected ? "PASS" : "FAIL"}`);
});
