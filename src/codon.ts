import {Life} from './life';
import {Spiral} from './spiral';
import {ProteinRegistry} from './protein-registry';
import {Protein} from './protein';

export class Codon {
    constructor(
        readonly proteinRegistry: ProteinRegistry,
        readonly codes: readonly number[]
    ) {
    }

    protein(): Protein {
        return this.proteinRegistry.get(this.codes[0]);
    }

    synthesize(life: Life): void {
        return this.protein().synthesize(life, ...this.codes.slice(1));
    }
    prepare(spiral: Spiral): void {
        return this.protein().walk(spiral, ...this.codes.slice(1));
    }

    toString(): string {
        return this.protein().toString() + ' ' + this.codes.join(' ');
    }
}
