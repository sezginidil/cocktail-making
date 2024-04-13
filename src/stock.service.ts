// src/app.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs/promises';
import { IngredientSchema, stockSchema, DrinkSchema, drinksSchema } from '../data/dto/dto.objects';


@Injectable()
export class StockService {
 

  async fetchStock():Promise<IngredientSchema[]>{
    const data = await fs.readFile("./data/stock.json", 'utf8');
    const parsedStock = stockSchema.parse(JSON.parse(data));
    return parsedStock.stock;
  }

  async getIngredientByName(ingredientName:string):Promise<IngredientSchema>{

    const stock = await this.fetchStock()
    const ingredient = stock.find((item)=> item.name === ingredientName)
    if(ingredient){
      return ingredient;
    }
    else {
      throw new Error(`Ingredient '${ingredientName}' not found in stock.`);
    }
   
  }

  async fetchDrinks(): Promise<DrinkSchema[]> {

      const drinksData = await fs.readFile('./data/drinks.json', 'utf8');
      const parsedDrinks = drinksSchema.parse(JSON.parse(drinksData));
      return parsedDrinks.drinks;
  
  }

  async reduceStock(ingredientName: string, reduceBy?: number): Promise<IngredientSchema> {
    // If reduceBy is not provided, default to reducing by 1
    const reduceAmount = reduceBy !== undefined ? reduceBy : 1;

    const stock = await this.fetchStock();
    const ingredient = stock.find((item) => item.name === ingredientName);

    if (ingredient) {
        // Ensure stock never goes below zero
        ingredient.quantity = Math.max(0, ingredient.quantity - reduceAmount);
    } else {
        throw new Error(`Ingredient '${ingredientName}' not found in stock.`);
    }

    await this.saveStock(stock);

    return ingredient;
}

  async updateOrAddIngredient(ingredientName: string, ingredient: IngredientSchema): Promise<IngredientSchema> {
    const stock = await this.fetchStock();
    const existingIngredient = stock.find((item) => item.name == ingredientName);
  
    if (existingIngredient) {
      existingIngredient.quantity = ingredient.quantity;
      await this.saveStock(stock);
      return existingIngredient;
    } else {
      if (ingredient.id) {
        const isIdUnique = !stock.some((item) => item.id === ingredient.id);
  
        if (!isIdUnique) {
          throw new Error(`Ingredient id '${ingredient.id}' is already used by another ingredient.`);
        }
      } else {
        const maxId = Math.max(...stock.map((item) => item.id), 0);
        ingredient.id = maxId + 1;
      }
  
        stock.push({ ...ingredient, name: ingredientName });

        await this.saveStock(stock);
  
      return ingredient;
    }
  }

  async deleteIngredient(ingredientName: string): Promise<void> {
    const stock = await this.fetchStock();
    const index = stock.findIndex((item) => item.name === ingredientName);

    if (index !== -1) {
      stock.splice(index, 1);
    } else {
      throw new NotFoundException(`Ingredient '${ingredientName}' not found in stock.`);
    }

    await this.saveStock(stock);
  }

      
  async saveStock(stock: IngredientSchema[]): Promise<void> {
    try {
      const stockData = { stock };
      await fs.writeFile('./data/stock.json', JSON.stringify(stockData, null, 2), 'utf8');
      console.log('Stock saved successfully.');
    } catch (error) {
      console.error('Error saving stock:', error);
      throw new Error('Failed to save stock.');
    }
  }

    
}