export interface Annonce {
  id: number;
  model: string;
  constructor: string;
  os: string;
  releaseDate: string;
  salerAvatar: string;
  saler: string;
  description: string;
  salerGender: string;
  salerCity: string;
  salerCountry: string;
  phone: string;
  price: number;
}
export async function getAnnonce(): Promise<Annonce[]> {
  try {
    const f1 = require('../phone.json'); // Charger le fichier JSON
    if (!f1 || !Array.isArray(f1)) {
      throw new Error('Le fichier JSON ne contient pas un tableau `results`');
    }

    return f1.map((value: any) => ({
      id: value.id,
      model: value.model,
      constructor: value.constructor,
      os: value.os,
      releaseDate: value.releaseDate,
      salerAvatar: value.salerAvatar,
      saler: value.saler,
      description: value.description,
      salerGender: value.salerGender,
      salerCity: value.salerCity,
      salerCountry: value.salerCountry,
      phone: value.phone,
      price: value.price,
    }));
  } catch (error) {
    console.error('Error with function getAnnonce: ', error);
    throw error;
  }
}
