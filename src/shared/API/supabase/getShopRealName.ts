export const getShopRealName = (name: string) => {
  const realNames = {
    'АКЦИОНЕРНОЕ ОБЩЕСТВО "ТАНДЕР"': 'Магнит',
    'ООО "Восторг 76"': 'Маяк',
  };

  // @ts-ignore
  return (realNames[name] ?? name) as string;
};
