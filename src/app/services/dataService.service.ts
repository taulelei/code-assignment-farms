import {Injectable} from '@angular/core';

import * as faker from 'faker';

export interface IDataService{
    getAllFarms(): Promise<Farm[]>;
    addFarm(farm: Farm): Promise<Farm[]>;
    getFarmInfo(code: string): Promise<Farm>;
    // editFarm(farm: Farm[]);
    removeFarm(farm: Farm): Promise<Farm[]>;
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

    getFarmInfo(code: string){
        return new Promise<Farm>((resolve, reject) => {
            resolve(this.farms.find(x => x.Code == code));
        });
    }

    addFarm(farm: Farm){
        this.farms.push(farm)
        return new Promise<Farm[]>((resolve, reject) => {
            resolve(this.farms);
        });
    }

    removeFarm(farm: Farm){
        var farmIndex = this.farms.indexOf(farm);
        this.farms.splice(farmIndex, 1);
        return new Promise<Farm[]>((resolve, reject) => {
            resolve(this.farms);
        });
    }

    private generateData(){
        this.farms = this.generateFarms();
        //this.millers = this.generateMillers();
    }

    private generateFarms(): Farm[]{
        var farms = [];
        for(var i = 0; i < 100; i++){
            farms.push(new Farm());
        }
        this.generateMillers(farms);
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
                //availFarms[randFarm].Miller = miller;
                farms.find(x => x.Code == availFarms[randFarm].Code).Miller = miller;
                miller.Farms.push(availFarms[randFarm]);
                availFarms.splice(randFarm, 1);
            }
            millerList.push(miller);
        }
        // alert(availFarms.length + " farms with no miller.");
        return millerList;
    }
}

// Models
export class Miller{
    Name: string = faker.name.findName();
    Address: string = faker.address.streetAddress();
    Farms: Farm[] = [];

    constructor(){
    }
}

export class Farm{
    private farmTypes: string[] = ['Cane', 'Rice', 'Wheat', 'Vegetable'];

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
}

export class Paddock{
    Code: string = faker.random.uuid();
    Area: number = faker.random.number({min: 7, max: 20});
    OwnerFarm: Farm;
    constructor(parentFarm: Farm){
        this.OwnerFarm = parentFarm;
    }
}