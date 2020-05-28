import {Sector, Spiral} from '../spiral';
import {random} from '../util/random';
import {Codon} from '../codon';

export function crossCodes(mother: readonly number[], father: readonly number[]): number[] {
    const length = Math.max(mother.length, father.length);

    const codes: number[] = [];
    for (let i = 0; i < length; i ++) {
        const mc = mother[i];
        const fc = father[i];
        let code: number;
        if (mc == null) {
            code = fc;
        } else if (fc == null) {
            code = mc;
        } else {
            code = (mc + fc) / 2;
        }
        codes.push(code);
    }

    return codes;
}

export function crossCodons(mother: Codon, father: Codon): Codon {
    return new Codon(
        mother.proteinRegistry,
        crossCodes(mother.codes, father.codes)
    )
}

export function crossSectors(mother: Sector, father: Sector): Sector {
    const label = (mother.label + father.label) / 2;
    const m = mother.codons;
    const f = father.codons;
    const length = Math.max(m.length, f.length);
    const codons: Codon[] = [];

    for (let i = 0; i < length; i ++) {
        const mc = m[i];
        const fc = f[i];
        let codon: Codon;
        if (mc == null) {
            codon = fc;
        } else if (fc == null) {
            codon = mc;
        } else {
            codon = crossCodons(mc, fc);
        }
        codons.push(codon);
    }

    return {
        codons,
        label
    }
}

export function crossSpirals(mother: Spiral, father: Spiral): Spiral {
    const ms = mother.sectors;
    const fs = father.sectors;

    const sectors: Sector[] = [];

    for (let mi = 0, fi = 0; mi < ms.length || fi < fs.length;) {
        const m = ms[mi];
        const f = fs[fi];

        if (m == null) {
            sectors.push(f);
            fi++;
        } else if (f == null) {
            sectors.push(m);
            mi++;
        } else {
            const ml = m.label;
            const fl = f.label;

            const labelScale = Math.max(Math.abs(ml), Math.abs(fl));
            const labelDelta = Math.abs(ml - fl);

            const combine = random([
                true,
                false
            ], [
                labelScale - labelDelta,
                labelDelta + (labelScale / 20)
            ]);

            if (combine) {
                fi++;
                mi++;
                sectors.push(
                    crossSectors(m, f)
                );
            } else {
                random([
                    () => {
                        sectors.push(f);
                        fi++;
                    },
                    () => {
                        sectors.push(m);
                        mi++;
                    }
                ]) ();
            }
        }
    }

    const codons = sectors.flatMap(sector => sector.codons);

    return new Spiral(
        codons
    );
}
