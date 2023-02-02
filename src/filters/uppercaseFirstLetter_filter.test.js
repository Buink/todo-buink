import uppercaseFirstLetter from './uppercaseFirstLetter_filter'

describe('uppercaseFirstLetter', () => {
    test('Корректное значение', () => {
        expect(uppercaseFirstLetter('abc')).toBe('Abc');
    })
    test('Строка с цифрами', () => {
        expect(uppercaseFirstLetter('123')).toBe('123');
    })
})