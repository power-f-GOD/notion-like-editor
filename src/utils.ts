export const preprocess = <Match extends string, Value extends string = string>(
  input: string,
  variables?: Partial<Record<Match, Value>>
) => {
  if (!variables) return input;

  let processed = input.slice();
  let match: Match;

  for (match in variables) {
    processed = processed.replace(`%${match}%`, variables[match]!);
  }

  return processed;
};
