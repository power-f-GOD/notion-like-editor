export abstract class Component<
  VariableMatch extends string = string,
  VariableValue extends string = string
> {
  query = <El extends Element = HTMLElement>(selectors: string) =>
    document.querySelector<El>(selectors);

  constructor(
    protected template: {
      html: string;
      variables?: Partial<Record<VariableMatch, VariableValue>>;
    }
  ) {}

  protected abstract init(): void;

  preprocess<Match extends string = string, Value extends string = string>(
    input: string,
    variables?: Partial<Record<Match, Value>>
  ) {
    if (!variables) return input;

    let processed = input.slice();
    let match: Match;

    for (match in variables) {
      processed = processed.replace(
        new RegExp(`%${match}%`, 'g'),
        variables[match]!
      );
    }

    return processed;
  }

  render() {
    // defer (or delay with setTimeout) till after component/element is mounted before (proceeding and) adding listeners
    setTimeout(this.init.bind(this));
    return this.preprocess(this.template.html, this.template.variables);
  }
}

export type SVGIconName =
  | 'text-t'
  | 'dots-three-vertical'
  | 'cloud'
  | 'arrow-down-left'
  | 'check-circle'
  | 'caret-double-right'
  | 'book-open'
  | 'lock-key-open'
  | 'caret-down'
  | 'clock';
