import {AdRecord} from "../records/ad.record";

const defaultObj = {
    name:'Test Name',
    description:'blah',
    lat:9,
    lon:9,
    url:'https://megak.pl',
    price:0,
}

test('Can build AdRecord', () => {
    const ad = new AdRecord(defaultObj);

    expect(ad.name).toBe('Test Name');
    expect(ad.description).toBe('blah');
});

test('Validates invalid price', () => {
    expect(() => new AdRecord({
        ...defaultObj,
        price:-2
    })).toThrow('Cena nie może być większa niż 99999 lub mniejsza niż 0.')


})
