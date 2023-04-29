import { preprocess as _preprocess } from 'src/utils';

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
    },
    protected preprocess: typeof _preprocess
  ) {}

  protected abstract init(): void;

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
