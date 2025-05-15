export function findCategoryId(categories, categoryName) {
  const category = categories.find((cat) => cat.name === categoryName);
  return category ? category.id : 38;
}
