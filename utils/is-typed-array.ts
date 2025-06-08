import TypeGuard from "@/utils/typeguard";

function isTypedArray<ExpectedType>(data: unknown, checkType: TypeGuard<ExpectedType>): data is ExpectedType[] {
  if (!data || !Array.isArray(data)) return false;
  for (const item of data) if (!checkType(item)) return false;
  return true
}

export default isTypedArray;