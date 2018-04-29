import * as a_context from './given/a_context';
import { something } from '../something';

describe("when doing stuff", () => {
    let context = null;

    beforeEach(() => {
        context = new a_context();
        (becauseOf => {

        })();
    })

    it("should be awesome", () => true.should.be.true);
});