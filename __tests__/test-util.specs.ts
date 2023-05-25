import { A } from "@/__test_until__/cloner";
import { reserveCommand, today, tomorrow } from "@/__test_until__/prototypes";

describe('A', () => {
    it('provides a generic prototype', () => {
        const command = A(reserveCommand,
            {
                from: { date: today, at: 11 },
                to: { date: tomorrow, at: 10 }
            });
        expect(command).toEqual({
            ...reserveCommand,
            from: { date: today, at: 11 },
            to: { date: tomorrow, at: 10 }
        })

    })
})