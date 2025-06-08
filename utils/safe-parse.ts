import type TypeGuard from './typeguard';

function safeParse<ExpectedType>(
  data: string,
  checkType: TypeGuard<ExpectedType>
): ExpectedType | undefined {
  return ((parsedData: unknown): ExpectedType | undefined => {
    if (checkType(parsedData)) return parsedData;
    return undefined;
  })(JSON.parse(data));
}

export default safeParse;