import {Injectable} from '@angular/core';

import * as faker from 'faker';

export interface IDataService{
    getAllFarms(): Promise<Farm[]>;
    addFarm(farm: Farm): Promise<number>;
    getFarmInfo(index: number): Promise<Farm>;
    editFarm(newFarm: Farm, existingFarm: Farm): Promise<number>;
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
        return new Promise<number>((resolve, reject) => {
            resolve(this.farms.indexOf(farm));
        });
    }

    editFarm(newFarm: Farm, existingFarm: Farm){
        //let existingFarm = this.farms.find(x => x.Id == farm.Id);
        existingFarm.Code = newFarm.Code;
        existingFarm.Name = newFarm.Name;
        existingFarm.DateTimeHarvested = newFarm.DateTimeHarvested;
        existingFarm.FarmType = newFarm.FarmType;
        existingFarm.Paddocks = newFarm.Paddocks;
        if(existingFarm.Miller !== undefined && existingFarm.Miller !== null){
            existingFarm.Miller.Farms.forEach(function(item, index, object){
                if(item.Id == existingFarm.Id){
                    object.splice(index, 1);
                }
            });
        }

        let newMiller = this.millers.find(x => x.Id == newFarm.Miller.Id);
        newMiller.Farms.push(existingFarm);
        existingFarm.Miller = newMiller;
        return new Promise<number>((resolve, reject) => {
            resolve(this.farms.indexOf(existingFarm));
        });
    }

    removeFarm(farm: Farm){
        let farmIndex = this.farms.indexOf(farm);
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
        let farms = [];
        for(let i = 0; i < 100; i++){
            let newFarm = new Farm();
            newFarm.initRandomFarm();
            newFarm.initPaddocks(newFarm);
            farms.push(newFarm);
        }
        this.millers = this.generateMillers(farms);
        return farms;
    }

    private generateMillers(farms): Miller[]{
        let millerList = [];
        let availFarms = farms.map(x => Object.assign({}, x));

        while(availFarms.length > 0){
            let miller = new Miller();
            miller.initRandomMiller();
            let noFarms = availFarms.length < 4 ? availFarms.length : Math.floor(Math.random()*4)+1;
            for(let j = 0; j < noFarms; j++){
                let randFarm = Math.floor(Math.random()*availFarms.length);
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

    Name: string;
    Address: string;
    Farms: Farm[] = new Array<Farm>();

    constructor(){
    }

    initRandomMiller(){
        this.Name = faker.name.findName();
        this.Address = faker.address.streetAddress();
    }
}

export class Farm{
    farmTypes: string[] = ['Cane', 'Rice', 'Wheat', 'Vegetable'];

    Id: string = faker.random.uuid();

    Code: string;
    Name: string;
    DateTimeHarvested: Date;
    FarmType: string;
    Miller: Miller;
    Paddocks: Paddock[] = new Array<Paddock>();

    constructor(){
    }

    initRandomFarm(){
        this.Code = faker.random.uuid();
        this.Name = faker.address.city() + " Farm";
        this.DateTimeHarvested = faker.date.past();
        this.FarmType = this.farmTypes[Math.floor(Math.random()*this.farmTypes.length)];
    }

    initPaddocks(farm: Farm){
        for(let i = 0; i < 20; i++){
            let newPaddock = new Paddock();
            newPaddock.initRandomPaddock();
            newPaddock.setOwnerFarm(farm);
            this.Paddocks.push(newPaddock);
        }
    }

    getPaddockArea(){
        let totalArea = 0;
        this.Paddocks.forEach(x => totalArea += x.Area);
        return totalArea;
    }

    removePaddock(paddock: Paddock){
        let index = this.Paddocks.findIndex(x => x.Id == paddock.Id);
        this.Paddocks.splice(index, 1);
    }
}

export class Paddock{
    Id: string = faker.random.uuid();
    
    Code: string;
    Area: number;
    OwnerFarm: Farm;
    constructor(){
    }

    initRandomPaddock(){
        this.Code = faker.random.uuid();
        this.Area = faker.random.number({min: 1, max: 4});
    }

    setOwnerFarm(farm: Farm){
        this.OwnerFarm = farm;
    }

    isValid(){
        if(this.Code === undefined || this.Code === null || this.Code.length < 1)
            return false;
        if(this.Area === undefined || this.Area === null || this.Area < 1)
            return false;
        return true;
    }
}