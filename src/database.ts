import Dexie from 'dexie';

export class TransactionAppDB extends Dexie{
	//Creamos propiedades
	transactions: Dexie.Table<ITransaction,number>;
	constructor(){
		super("MoneyMapAppDB");

		this.version(1).stores({
			transactions: '++id, amount, lat, lng, title, imageUrl'
		});

		this.transactions.mapToClass(Transaction);

	}
}

export interface ICategory{

}

export interface ITransaction{
	id?: number;
	amount: number;
	lat: number;
	lng: number;
	title: string;
	imageUrl: string;
}

export class Transaction implements ITransaction{
	id?: number;
	amount: number;
	lat: number;
	lng: number;
	title: string;
	imageUrl: string;

	constructor(amount:number, title:string, lat?: number, lng?: number, 
				id?: number, imageUrl?: string){
		this.amount = amount;
		this.title = title;
		if(lat) this.lat = lat;
		if(lng) this.lng = lng;
		if(id) this.id = id;
		if(imageUrl) this.imageUrl = imageUrl;
	}

	// Metodo Save para guardar dentro de la base de datos
	save(){
		return db.transactions.add(this);
	}
}

export let db = new TransactionAppDB();