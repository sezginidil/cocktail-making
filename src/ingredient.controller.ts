// src/app.controller.ts
import { Body, Controller, Delete, Get, NotFoundException, Param, Put, Query } from '@nestjs/common';
import { DrinkSchema, IngredientSchema } from '../data/dto/dto.objects';
import { StockService } from './stock.service';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly stockService: StockService) {}

    @Get('/:ingredientName/dec')
    async reduceStock(
    @Param('ingredientName') ingredientName: string,
    @Query('reduceBy') reduceBy?: number):Promise<IngredientSchema>{
        return await this.stockService.reduceStock(ingredientName,reduceBy)
    }

    @Put('/:ingredientName')
    async updateStock(
        @Param('ingredientName') ingredientName: string,
        @Body() ingredient: IngredientSchema,
    ): Promise<IngredientSchema> {
        console.log("update stock function")
        return this.stockService.updateOrAddIngredient(ingredientName, ingredient);
    }

    @Delete(':ingredientName')
    async deleteIngredient(@Param('ingredientName') ingredientName: string): Promise<void> {
        try {
        await this.stockService.deleteIngredient(ingredientName);
        } catch (error) {
        if (error instanceof NotFoundException) {
            throw error;
        } else {
            throw new Error('Internal Server Error');
            }
        }
    }

    @Get('/:ingredientName')
    async getIngredientByName(
    @Param('ingredientName') ingredientName: string):Promise<IngredientSchema> {
        return await this.stockService.getIngredientByName(ingredientName)
    }

    @Get()
    async getAllIngredients(): Promise<DrinkSchema[]> {
        return await this.stockService.fetchStock()
    }
}