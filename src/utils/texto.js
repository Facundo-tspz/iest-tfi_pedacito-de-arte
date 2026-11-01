export function normalizarTexto(valor) {
  return typeof valor === 'string'
    ? valor
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
    : '';
}
