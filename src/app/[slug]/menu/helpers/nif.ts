// Função para remover caracteres não alfanuméricos do NIF
export const removeNifPunctuation = (nif: string): string => {
  return nif.replace(/[^a-zA-Z0-9]/g, "");
};

// Função para validar o NIF de Angola
export const isValidNif = (nif: string): boolean => {
  // Remove espaços e pontuação
  nif = removeNifPunctuation(nif.trim());

  // Verifica se o NIF tem exatamente 14 caracteres após remoção de pontuação
  if (nif.length !== 14) {
    return false;
  }

  // Verifica se os primeiros 9 caracteres são dígitos
  const firstNineDigits = nif.substring(0, 9);
  if (!/^\d{9}$/.test(firstNineDigits)) {
    return false;
  }

  // Verifica se os próximos 2 caracteres são letras correspondentes às províncias
  const provinceCode = nif.substring(9, 11).toUpperCase();
  const validProvinceCodes = [
    "BA", // Benguela
    "BG", // Bengo
    "BI", // Bié
    "CC", // Cabinda
    "CS", // Cuando Cubango
    "CN", // Cuanza Norte
    "KS", // Cuanza Sul
    "CU", // Cunene
    "HO", // Huambo
    "HL", // Huíla
    "LA", // Luanda
    "LN", // Lunda Norte
    "LS", // Lunda Sul
    "ML", // Malanje
    "MO", // Moxico
    "NB", // Namibe
    "UG", // Uíge
    "ZA", // Zaire
  ];
  if (!validProvinceCodes.includes(provinceCode)) {
    return false;
  }

  // Verifica se os últimos 3 caracteres são dígitos
  const lastThreeDigits = nif.substring(11);
  if (!/^\d{3}$/.test(lastThreeDigits)) {
    return false;
  }

  // Se todas as verificações passaram, o NIF é válido
  return true;
};