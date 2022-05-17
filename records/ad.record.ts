import {AdEntity, NewAdEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";


type AdRecordResults = [AdEntity[], FieldPacket[]];

export class AdRecord implements AdEntity {
    id: string;
    description: string;
    lat: number;
    lon: number;
    name: string;
    price: number;
    url: string;

    constructor(obj: NewAdEntity) {
        if(!obj.name || obj.name.length > 100){
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta, ani przekraczać 100 znaków.')
        }
        if (obj.description.length > 1000){
            throw new ValidationError('Treś nie może przekraczac 1000 znaków.')
        }

        if(obj.price < 0 || obj.price > 9999999){
            throw new ValidationError('Cena nie może być większa niż 99999 lub mniejsza niż 0.')
        }
        if(!obj.url || obj.url.length > 100){
            throw new ValidationError('Link nie może być pusta, ani przekraczać 100 znaków.')
        }

        if(typeof obj.lat !== 'number' || typeof obj.lon !== 'number'){
            throw new ValidationError('Nie można zlokalizować ogłoszenia.')
        }

        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }
    static async getOne(id: string): Promise<AdRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE id =:id",{
            id,
        }) as AdRecordResults;

        return results.length === 0 ? null : new AdRecord(results[0]);
    }
}
