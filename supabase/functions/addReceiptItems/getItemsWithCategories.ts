export const getItemsWithCategories = async ({
  access_token,
  categories,
  items,
}: {
  access_token: string;
  categories: string[];
  items: string[];
}) => {
  const url = 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions';
  const modelName = 'GigaChat-2-Max'; // Укажите название модели

  const categoriesText = `[${categories.join(', ')}]`;
  const itemsText = `[${items.join(', ')}]`;
  const prompt = `
  Есть список категорий: ${categoriesText}. 
  Есть список товаров(формат: {name: текст, sum: число, quantity: число}): ${itemsText}. 
  Пришли ответ в виде json в таком формате: Массив объектов формата {name: текст, sum: число, quantity: число, category: текст}. 
  В ответе должен быть только json и не должно быть не каких предложений`;

  return prompt;

  const requestData = {
    model: modelName,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    n: 1,
    stream: false,
    max_tokens: 512,
    repetition_penalty: 1,
    update_interval: 0,
  };

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${access_token}`,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestData),
  });

  const data = await response.json();

  return data;
};
