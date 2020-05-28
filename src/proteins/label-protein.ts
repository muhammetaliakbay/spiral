import {DefineProtein, Protein} from '../protein';
import {Spiral} from '../spiral';
import {filterBoolean} from '../life';

@DefineProtein
export class LabelProtein extends Protein {
    walk(spiral: Spiral, label: number, sector: number): void {
        if (label != null) {
            spiral.markCodon(label, filterBoolean(sector));
        }
    }
}
