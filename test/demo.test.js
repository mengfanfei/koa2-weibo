/**
 * @description test demo
 * @author mengfanfei
 */

function sum(a, b) {
    return a+b
}

test('10 + 20 应该等于30', () => {
    const res = sum(10, 20)
    expect(res).toBe(30)
})