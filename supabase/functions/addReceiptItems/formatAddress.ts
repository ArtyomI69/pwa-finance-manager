export function formatAddress(input: string) {
  return input.replaceAll(',', '+').replaceAll(' ', '');
}
