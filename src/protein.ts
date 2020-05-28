import {Life} from './life';
import {Spiral} from './spiral';

export function DefineProtein<P extends Protein> (constructor: Function) {
}

export abstract class Protein {
    synthesize(life: Life, ...parameters: number[]): void {}
    walk(spiral: Spiral, ...parameters: number[]): void {}

    toString(): string {
        return this.constructor.name;
    }
}
