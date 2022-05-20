import {AdRecord} from "../records/ad.record";
import {pool} from "../utils/db";

afterAll(async () => {
    await pool.end();
})

test('AdRecord.getOne returns data from database for one entry.', async () => {
    const ad = await AdRecord.getOne('abc');
    expect(ad).toBeDefined();
    expect(ad.id).toBe('abc');
    expect(ad.name).toBe('Testowa');
});

test('AdRecord.getOne returns null from database for unexisting entry.', async () => {
    const ad = await AdRecord.getOne('---');

    expect(ad).toBeNull();
})


test('AdRecord returns array of found entries.', async () => {
    const ads = await AdRecord.findAll('');

    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
})

test('AdRecord returns empty array when seatching for something that does not existss.', async () => {
    const ads = await AdRecord.findAll('--------------------------------');

    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
})

test('AdRecord insert  returns UUID.', async () => {
    const ad = new AdRecord({
        name:'Test Name',
        description:'blah',
        lat:9,
        lon:9,
        url:'https://megak.pl',
        price:0,
    });
    await ad.insert();

    expect(ad.id).toBeDefined();
    expect(typeof ad.id).toBe('string');
})
