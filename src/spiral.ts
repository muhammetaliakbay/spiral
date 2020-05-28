import {Codon} from './codon';
import {filterValue} from './life';

export interface Sector {
    readonly label: number;
    readonly codons: readonly Codon[];
}

export class Spiral {
    private codonMarks: {
        position: number;
        label: number;
        sector: boolean;
    }[] = [];
    readonly sectors: readonly Sector[] = [];
    private walkPosition = 0;
    readonly codonLength: number;
    readonly codeLength: number;
    constructor(
        readonly codons: readonly Codon[]
    ) {
        this.codonLength = codons.length;
        this.codeLength = codons.map(codon => codon.codes.length).reduce((a, b) => a + b, 0);
        this.prepare();
    }

    private sectorPoint: number | null = null;
    prepare(): void {
        let sector: Sector | null = null;
        for (let position = 0; position < this.codonLength; position++) {
            this.sectorPoint = null;
            this.walkPosition = position;
            const codon = this.codon(position);
            codon.prepare(this);
            if (this.sectorPoint != null) {
                sector = {
                    codons: [],
                    label: this.sectorPoint
                };
                (this.sectors as Sector[]).push(sector);
            } else if (sector == null) {
                sector = {
                    codons: [],
                    label: 0
                };
                (this.sectors as Sector[]).push(sector);
            }
            (sector.codons as Codon[]).push(codon);
        }
    }

    markCodon(label: number, sector: boolean = false): void {
        this.codonMarks.push({
            position: this.walkPosition,
            label: filterValue(label),
            sector
        });
        this.sectorPoint = label;
    }
    findCodonMark(targetLabel: number): number | null {
        let minDelta: number | null = null;
        let bestPosition = null;
        for (const mark of this.codonMarks) {
            const delta = Math.abs(targetLabel - mark.label);
            if (minDelta == null || delta <= minDelta) {
                bestPosition = mark.position;
                minDelta = delta;
            }
        }
        if (bestPosition == null) {
            return null;
        } else {
            return bestPosition;
        }
    }

    codon(index: number): Codon {
        return this.codons[index];
    }

    toString(): string {
        return '('+this.codons.map(codon => codon.toString()).join(',')+')';
    }

    equals(spiral: Spiral): boolean {
        return this.toString() === spiral.toString();
    }
}
