export function parsePolishAddress(address: string) {
  if (!address || typeof address !== 'string') {
    return {
      postalCode: null,
      postOffice: null,
      houseNumber: null,
      city: null,
      street: null,
    };
  }

  // 🔹 Oczyść tekst: usuń przecinki, kropki, nadmiarowe spacje
  let raw = address.replace(/[.,]/g, ' ').replace(/\s+/g, ' ').trim();

  // 🔹 Usuń przedrostek "ul", "ulica", "ul." (niezależnie od wielkości liter)
  raw = raw.replace(/\b(ul|ulica)\b/gi, '').trim();

  // 🔹 Szukaj kodu pocztowego
  const postalRegex = /\b(\d{2})-?(\d{3})\b/;
  const match = raw.match(postalRegex);

  let postalCode = null;
  let postOffice = null;
  let city = null;
  let street = null;
  let houseNumber = null;

  if (match) {
    postalCode = match[1] + match[2]; // usuń myślnik
    const postalIndex = raw.indexOf(match[0]);

    // Część przed i po kodzie
    const before = raw.slice(0, postalIndex).trim();
    const after = raw.slice(postalIndex + match[0].length).trim();

    // Po kodzie → zazwyczaj miasto/poczta
    postOffice = after || null;
    city = postOffice;

    // Przed kodem → ulica + numer
    const numberMatch = before.match(/(\d+[A-Z]?(?:\/\d+[A-Z]?)?)$/i);
    if (numberMatch) {
      houseNumber = numberMatch[1];
      street = before.replace(houseNumber, '').trim() || null;
    } else {
      street = before || null;
    }

  } else {
    // Brak kodu pocztowego
    const numberMatch = raw.match(/(\d+[A-Z]?(?:\/\d+[A-Z]?)?)$/i);
    if (numberMatch) {
      houseNumber = numberMatch[1];
      street = raw.replace(houseNumber, '').trim() || null;
    } else {
      street = raw || null;
    }
  }

  return {
    postalCode,
    postOffice,
    houseNumber,
    city,
    street,
  };
}