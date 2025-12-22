export function capitalizePolish(str:string|null) {
  if (typeof str !== 'string') return str;
  const preserveShortAcronyms = true;
  const locale = 'pl-PL';

  // ujednolicenie formy znaków
  const normalized = str.normalize('NFC');

  // rozbijamy zachowując separatory (spacje, taby itp.)
  const parts = normalized.split(/(\s+)/);

  return parts.map(token => {
    // zachowaj separatory bez zmian
    if (!token || /^\s+$/.test(token)) return token;

    // jeśli opcja i token to krótki akronim (same wielkie litery, długość 1-3) -> zostaw
    if (preserveShortAcronyms && /^\p{Lu}{1,3}$/u.test(token)) return token;

    // obniż do małych liter używając polskiej lokalizacji
    const lower = token.toLocaleLowerCase(locale);

    // znajdź indeks pierwszego znaku będącego literą (uwzględnia unicode)
    const firstLetterMatch = lower.match(/\p{L}/u);
    if (!firstLetterMatch) return token; // brak liter w tokenie (np. "11/2", ",") -> zostaw

    const firstIdx = lower.search(/\p{L}/u);

    // zbuduj wynik: wszystko przed pierwszą literą + pierwsza litera z dużej + reszta
    const before = lower.slice(0, firstIdx);
    const firstLetter = lower.charAt(firstIdx).toLocaleUpperCase(locale);
    const after = lower.slice(firstIdx + 1);

    return before + firstLetter + after;
  }).join('');
}