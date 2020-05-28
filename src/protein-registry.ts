import {Protein} from './protein';
import {filterNormalCyclicIndex} from './life';

import {AbsoluteProtein} from './proteins/math/absolute-protein';
import {AddProtein} from './proteins/math/add-protein';
import {DivideProtein} from './proteins/math/divide-protein';
import {ModulusProtein} from './proteins/math/modulus-protein';
import {MultiplyProtein} from './proteins/math/multiply-protein';
import {NegateProtein} from './proteins/math/negate-protein';
import {SubtractProtein} from './proteins/math/subtract-protein';
import {ConstantProtein} from './proteins/constant-protein';
import {DieProtein} from './proteins/die-protein';
import {JumpProtein} from './proteins/jump-protein';
import {LabelProtein} from './proteins/label-protein';
import {RemoveProtein} from './proteins/remove-protein';
import {PullProtein} from './proteins/pull-protein';

export class ProteinRegistry {
    private proteins: Protein[] = [];
    put(...proteins: Protein[]) {
        this.proteins.push(...proteins);
    }
    get(index: number): Protein {
        const projectedIndex = filterNormalCyclicIndex(index, this.proteins.length);
        return this.proteins[projectedIndex];
    }
}

export const standardProteinRegistry = new ProteinRegistry();

standardProteinRegistry.put(
    // Math Proteins
    new AbsoluteProtein(),
    new AddProtein(),
    new DivideProtein(),
    new ModulusProtein(),
    new MultiplyProtein(),
    new NegateProtein(),
    new SubtractProtein(),

    // Stack Modify Proteins
    new ConstantProtein(),
    new RemoveProtein(),
    new PullProtein(),

    // Flow Control Proteins
    new DieProtein(),
    new JumpProtein(),

    // Meta Proteins
    new LabelProtein()
);
