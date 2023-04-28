export const Q = document.querySelector.bind(document);
export const QAll = document.querySelectorAll.bind(document);

export const preprocess = <Match extends string, Value extends string = string>(
  input: string,
  entries: Partial<Record<Match, Value>>
) => {
  let processed = input.slice();
  let match: Match;

  for (match in entries) {
    processed = processed.replace(`%${match}%`, entries[match]!);
  }

  return processed;
};
