// Função para remover caracteres não alfanuméricos do NIF
export const removeNifPunctuation = (nif: string): string => {
  return nif.replace(/[^a-zA-Z0-9]/g, "");
};

// Função para validar o NIF de Angola
export const isValidNifAngola = (nif: string): boolean => {
  // Remove espaços em branco no início e no fim
  nif = nif.trim();

  // Verifica se o NIF tem exatamente 14 caracteres
  if (nif.length !== 14) {
    return false;
  }
  // Verifica se os primeiros 9 caracteres são dígitos
  const firstNineDigits = nif.substring(0, 9);
  if (!/^\d{9}$/.test(firstNineDigits)) {
    return false;
  }

  // Verifica se os próximos 3 caracteres são letras correspondentes às províncias
  const provinceCode = nif.substring(10, 12).toUpperCase();
  const validProvinceCodes = [
    "BA", "BG", "CC", "CN", "CS", "HO", "HL", "LA", "LN", "LS", "ML", "MO", "NB",
    "UG", "ZA"
  ];
  if (!validProvinceCodes.includes(provinceCode)) {
    return false;
  }

  // Verifica se os últimos 3 caracteres são dígitos
  const lastTwoDigits = nif.substring(12);
  if (!/^\d{3}$/.test(lastTwoDigits)) {
    return false;
  }

  // Se todas as verificações passaram, o NIF é considerado válido
  return true;
};
