import { a_context } from './given/a_context';
import { something } from '../something';
import { my_command} from '../my_command';

describe("when doing stuff", () => {
    let context = null;

    beforeEach(() => {
        (becauseOf => {
            context = new a_context();
            new something({});
            let command = new my_command();

        })();
    })

    it("should be awesome", () => true.should.be.true);
});