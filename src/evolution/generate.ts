import {ProteinRegistry, standardProteinRegistry} from '../protein-registry';
import {Codon} from '../codon';
import {random} from '../util/random';
import {Spiral} from '../spiral';

export function randomSpiral(proteinRegistry?: ProteinRegistry): Spiral {
    const length = random([1, 2, 3, 4, 5], [5, 4, 3, 2, 1]);
    const codons: Codon[] = [];
    for(let i = 0; i < length; i++) {
        codons[i] = randomCodon(proteinRegistry);
    }
    return new Spiral(codons);
}

export function randomCodon(proteinRegistry: ProteinRegistry = standardProteinRegistry): Codon {
    return new Codon(proteinRegistry, randomCodes())
}

export function randomCodes(): number[] {
    const length = random([1, 2, 3, 4, 5], [5, 4, 3, 2, 1]);
    const codes: number[] = [];
    for(let i = 0; i < length; i++) {
        codes[i] = random([Math.random(), Math.random()/Math.random()]);
    }
    return codes;
}
