export const getShopRealName = (name: string) => {
  const realNames = {
    'АКЦИОНЕРНОЕ ОБЩЕСТВО "ТАНДЕР"': 'Магнит',
    'ООО "Восторг 76"': 'Маяк',
    'Общество с ограниченной ответственностью "Агроторг" ': 'Пятёрочка',
  };

  // @ts-ignore
  return (realNames[name] ?? name) as string;
};
