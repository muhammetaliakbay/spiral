import {DefineProtein, Protein} from '../protein';
import {Life} from '../life';

@DefineProtein
export class RemoveProtein extends Protein {
    synthesize(life: Life, distance: number = 0, removes: number = 0): void {
        life.remove(distance, removes);
    }
}
