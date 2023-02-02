import square from "./square";

describe('square', () => {
    let mockValue;
    beforeEach(() => {
        mockValue = Math.random()
    })
    test('Корректное значения', () => {
        expect(square(mockValue)).toBe(mockValue * mockValue);
        expect(square(2)).toBeLessThan(5);
        expect(square(2)).toBeGreaterThan(3);
        expect(square(2)).not.toBeUndefined();
    })
    test('Функция вызывается один раз', () => {
        const spyMathPow = jest.spyOn(Math,'pow')
        square(2)
        expect(spyMathPow).toBeCalledTimes(1)
    })
    test('Функция не вызывается при 1', () => {
        const spyMathPow = jest.spyOn(Math,'pow')
        square(1)
        expect(spyMathPow).toBeCalledTimes(0)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
})