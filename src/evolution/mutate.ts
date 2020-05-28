import {Spiral} from '../spiral';
import {Codon} from '../codon';
import {random} from '../util/random';
import {ProteinRegistry, standardProteinRegistry} from '../protein-registry';
import {randomCodon} from './generate';

const rate = 50;

export function mutateCodes(codes: readonly number[]): number[] | null {
    let mutant = codes.map(code => random([
        (code: number) => code / Math.random(),
        (code: number) => code * Math.random(),
        (code: number) => code + Math.random(),
        (code: number) => code - Math.random(),
        (code: number) => Math.random(),
        (code: number) => code
    ], [1, 1, 1, 1, 1, rate]) (code));

    const removeIndex = random(
        [-1, ...mutant.map((code, index) => index)],
        [rate, ...mutant.map(() => 1)]
    );
    if (removeIndex >= 0) {
        mutant.splice(removeIndex, 1);
    }

    const insertIndex = random(
        [-1, ...mutant.map((code, index) => index)],
        [rate, ...mutant.map(() => 1)]
    );
    if (insertIndex >= 0) {
        mutant.splice(insertIndex, 0, Math.random());
    }

    return mutant.length > 0 ? mutant : null;
}

export function mutateCodon(codon: Codon): Codon | null {
    const codes = mutateCodes(codon.codes);
    return codes == null ? null : new Codon(
        codon.proteinRegistry,
        codes
    );
}

export function mutateSpiral(spiral: Spiral): Spiral {
    const mutant: Codon[] = (spiral.codons.map(
        codon => mutateCodon(codon)
    ).filter(codon => codon != null) as Codon[])
        .flatMap(codon => {
            if (random([true, false], [1, rate])) {
                return [codon, randomCodon()];
            } else {
                return [codon];
            }
        });

    return new Spiral(mutant);
}
