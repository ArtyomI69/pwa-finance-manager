export const getItemsWithCategories = async ({
  categories,
  items,
}: {
  categories: string[];
  items: string[];
}) => {
  const categoriesText = `[${categories.join(', ')}]`;
  const itemsText = `[${items.join(', ')}]`;
  const prompt = `
  Есть список категорий: ${categoriesText}. 
  Есть список товаров(формат: {name: текст, sum: число, quantity: число}): ${itemsText}. 
  Пришли ответ в виде json в таком формате: Массив объектов формата {name: текст, sum: число, quantity: число, category: текст}. 
  В ответе должен быть только json и не должно быть не каких предложений`;

  const requestData = {
    modelUri: 'gpt://b1gp7dtvuasv62sfpbt2/yandexgpt',
    completionOptions: {
      stream: false,
      temperature: 0.1,
      maxTokens: 2000,
    },
    messages: [
      {
        role: 'user',
        text: prompt,
      },
    ],
  };

  const headers = {
    'Content-Type': 'application/json',
    'x-folder-id': 'b1gp7dtvuasv62sfpbt2',
    Authorization: `Api-key ${Deno.env.get('YA_GPT_API_KEY')}`,
  };

  const response = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestData),
  });

  const data = await response.json();
  const textWithJson = data.result.alternatives[0].message.text;

  // Удаляем обратные кавычки и лишние пробелы
  const jsonString = textWithJson.replace(/```/g, '').trim();

  // Парсим JSON в JavaScript объект
  const parsedItems = JSON.parse(jsonString);

  // Возвращаем результат
  return parsedItems;
};
