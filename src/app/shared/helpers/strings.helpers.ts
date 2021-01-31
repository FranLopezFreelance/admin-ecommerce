const removeAccentsAndCase = (text: string): string => {
  return text?.toLowerCase()?.normalize('NFD')?.replace(/[\u0300-\u036f]/g, '');
};

export const includesWithoutAccentsAndCase = (text: string | any, textIncluded: string): boolean => {
  return removeAccentsAndCase(text)?.includes(removeAccentsAndCase(textIncluded));
};
