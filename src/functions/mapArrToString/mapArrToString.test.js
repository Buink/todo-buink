import mapArrToString from "./mapArrToString";

describe('mapArrToString', () => {
    test('Корректное значения', () => {
        expect(mapArrToString([1, 2, 3])).toEqual(['1', '2', '3']);
    })
    test('Мешанина', () => {
        expect(mapArrToString([1, 2, 3, null, undefined, 'asd'])).toEqual(['1', '2', '3']);
    })
    test('Пустой массив', () => {
        expect(mapArrToString([])).toEqual([]);
    })
    test('Отрицание', () => {
        expect(mapArrToString([1, 2, 3])).not.toEqual(['1', '2', '3', '4']);
    })
})