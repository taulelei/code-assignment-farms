import {Injectable} from '@angular/core';

import * as faker from 'faker';

export interface IDataService{
    getAllFarms(): Promise<Farm[]>;
    addFarm(farm: Farm): Promise<Farm[]>;
    getFarmInfo(index: number): Promise<Farm>;
    editFarm(index: number, farm: Farm): Promise<number>;
    removeFarm(farm: Farm): Promise<Farm[]>;

    getAllMillers(): Promise<Miller[]>;
    getMillerInfo(index: number): Promise<Miller>;
}

@Injectable()
export class DataService implements IDataService{
    public farms: Farm[];
    public millers: Miller[];

    constructor(){
        this.generateData();
    }

    getAllFarms(){
        return new Promise<Farm[]>((resolve, reject) => {
            resolve(this.farms);
        });
    }

    getFarmInfo(index: number){
        return new Promise<Farm>((resolve, reject) => {
            resolve(this.farms[index]);
        });
    }

    addFarm(farm: Farm){
        this.farms.push(farm)
        return new Promise<Farm[]>((resolve, reject) => {
            resolve(this.farms);
        });
    }

    editFarm(index: number, farm: Farm){
        var existingFarm = this.farms.find(x => x.Id == farm.Id);
        existingFarm.Code = farm.Code;
        existingFarm.Name = farm.Name;
        existingFarm.DateTimeHarvested = farm.DateTimeHarvested;
        existingFarm.FarmType = farm.FarmType;
        existingFarm.Paddocks = farm.Paddocks;

        var existingMiller = this.millers.find(x => x == existingFarm.Miller);
        //var millerFarmIndex = existingMiller.Farms.indexOf(existingFarm);
        existingMiller.Farms.forEach(function(item, index, object){
            if(item.Id == existingFarm.Id){
                object.splice(index, 1);
            }
        });

        //existingMiller.Farms.splice(millerFarmIndex, 1);

        var newMiller = this.millers.find(x => x.Id == farm.Miller.Id);
        newMiller.Farms.push(existingFarm);
        existingFarm.Miller = newMiller;
        return new Promise<number>((resolve, reject) => {
            resolve(index);
        });
    }

    removeFarm(farm: Farm){
        var farmIndex = this.farms.indexOf(farm);
        this.farms.splice(farmIndex, 1);
        return new Promise<Farm[]>((resolve, reject) => {
            resolve(this.farms);
        });
    }

    getAllMillers(){
        return new Promise<Miller[]>((resolve, reject) => {
            resolve(this.millers);
        });
    }

    getMillerInfo(index: number){
        return new Promise<Miller>((resolve, reject) => {
            resolve(this.millers[index]);
        });
    }

    // Seeding functions
    private generateData(){
        this.farms = this.generateFarms();
    }

    private generateFarms(): Farm[]{
        var farms = [];
        for(var i = 0; i < 100; i++){
            farms.push(new Farm());
        }
        this.millers = this.generateMillers(farms);
        return farms;
    }

    private generateMillers(farms): Miller[]{
        var millerList = [];
        var availFarms = farms.map(x => Object.assign({}, x));

        while(availFarms.length > 0){
            var miller = new Miller();
            var noFarms = Math.floor(Math.random()*4) + 1;
            if(noFarms > availFarms.length)
                noFarms = availFarms.length;
            for(var j = 0; j < noFarms; j++){
                var randFarm = Math.floor(Math.random()*availFarms.length);
                farms.find(x => x.Code == availFarms[randFarm].Code).Miller = miller;
                miller.Farms.push(availFarms[randFarm]);
                availFarms.splice(randFarm, 1);
            }
            millerList.push(miller);
        }
        return millerList;
    }
}

// Models
export class Miller{
    Id: string = faker.random.uuid();

    Name: string = faker.name.findName();
    Address: string = faker.address.streetAddress();
    Farms: Farm[] = [];

    constructor(){
    }
}

export class Farm{
    farmTypes: string[] = ['Cane', 'Rice', 'Wheat', 'Vegetable'];

    Id: string = faker.random.uuid();

    Code: string = faker.random.uuid();
    Name: string = faker.address.city() + " Farm";
    DateTimeHarvested: Date = faker.date.past();
    FarmType: string = this.farmTypes[Math.floor(Math.random()*this.farmTypes.length)];
    Miller: Miller;
    Paddocks: Paddock[] = [];

    constructor(){
        for(var i = 0; i < 20; i++){
            this.Paddocks.push(new Paddock(this));
        }
    }

    getPaddockArea(){
        let totalArea = 0;
        this.Paddocks.forEach(x => totalArea += x.Area);
        return totalArea;
    }
}

export class Paddock{
    Id: string = faker.random.uuid();
    
    Code: string = faker.random.uuid();
    Area: number = faker.random.number({min: 1, max: 4});
    OwnerFarm: Farm;
    constructor(parentFarm: Farm){
        this.OwnerFarm = parentFarm;
    }
}