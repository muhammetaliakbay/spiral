import {ProteinRegistry} from './protein-registry';
import {Spiral} from './spiral';

export function filterValue(value: any, def: number = 0): number {
    return typeof value === 'number' ? value : def;
}

export function filterInteger(value: number): number {
    return Math.round(filterValue(value));
}

export function filterIndex(value: number): number {
    return Math.max(filterInteger(value), 0);
}

export function filterBoolean(value: number, def: boolean = false): boolean {
    return filterValue(value, def ? 1 : -1) >= 0;
}

export function filterCyclicIndex(value: number, length: number): number {
    let integer = filterInteger(value);
    integer %= length;
    if (integer < 0) {
        integer += length;
    }
    return integer;
}

export function filterNormalCyclicIndex(value: number, length: number): number {
    let normal = filterValue(value) % 1;
    if (normal < 0) {
        normal += 1;
    }
    return Math.round(normal * (length-1));
}

export function padValues(values: number[], length: number, fill: number): number[] {
    const delta = length - values.length;
    if (delta > 0) {
        for (let i = 0; i < delta; i++) {
            values.push(fill);
        }
    }
    return values;
}

export class Life {
    private stack: number[] = [];
    private position = 0;
    private nextPosition = 1;
    private dead = false;

    maxStack: number = 0;
    age: number = 0;

    constructor(
        readonly spiral: Spiral
    ) {
    }

    beat(): boolean {
        if (this.dead) {
            return false;
        }

        this.nextPosition = this.position + 1;
        const codon = this.spiral.codon(this.position);
        if (codon == null) {
            this.die();
        } else {
            codon.synthesize(this);
            this.position = this.nextPosition;
            this.age ++;
        }

        this.maxStack = Math.max(this.maxStack, this.stack.length);

        return this.alive();
    }

    alive(): boolean {
        return !this.dead;
    }

    die(): void {
        this.dead = true;
    }

    modify(distance: number, removes: number, ...replaces: number[]): number[] {
        const index = this.stack.length - filterIndex(distance) - filterIndex(removes);
        return this.stack.splice(index, filterIndex(removes), ...(replaces.map(value => filterValue(value))));
    }
    read(distance: number, length: number): number[] {
        const index = this.stack.length - filterIndex(distance) - length;
        return this.stack.slice(index, index + length);
    }
    get(distance: number): number {
        const single = this.read(distance, 1)[0];
        return single == null ? 0 : single;
    }
    write(distance: number, ...values: number[]): number[] {
        return this.modify(distance, 0, ...values);
    }
    remove(distance: number, removes: number): number[] {
        return this.modify(distance, removes);
    }

    jump(targetLabel: number) {
        if (targetLabel != null) {
            const markPosition = this.spiral.findCodonMark(targetLabel);
            if (markPosition != null) {
                this.nextPosition = markPosition;
            }
        }
    }
}
