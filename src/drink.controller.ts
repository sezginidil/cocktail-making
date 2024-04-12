import { Controller, Get, Param } from '@nestjs/common'; 
import { DrinkSchema } from '../data/dto/dto.objects';
import { DrinkService } from './drink.service'; 
 
@Controller('drinks') 
export class DrinkController { 
  constructor(private readonly drinkService: DrinkService 
    ) {} 
@Get("/cpee") 
async cpeeTest(){ 
  return {students:"350"} 
} 
 
  @Get('/:drinkName/order-possible') 
    async checkAvailability( @Param('drinkName') drinkName: string): Promise<boolean> { 
      return await this.drinkService.isDrinkAvailable(drinkName) 
  }  
 
  @Get('/:drinkName/order') 
    async orderDrink( @Param('drinkName') drinkName: string): Promise<DrinkSchema>  { 
      return await this.drinkService.orderDrink(drinkName)  
  }  
 
  @Get('/:drinkName') 
  async getRecipe( @Param('drinkName') drinkName: string): Promise<DrinkSchema> { 
    return await this.drinkService.getRecipeWithAvailableAmounts(drinkName); 
}   
 
  @Get() 
  async getAllDrinks(): Promise<DrinkSchema[]> { 
    return await this.drinkService.calculateAvailableDrinks(); 
  } 
} 