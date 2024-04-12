import { Module } from '@nestjs/common'; 
import { ServeStaticModule } from '@nestjs/serve-static'; 
import { join } from 'path/posix'; 
import { AppController } from './app.controller'; 
import { DrinkController } from './drink.controller'; 
import { DrinkService } from './drink.service'; 
import { IngredientController } from './ingredient.controller'; 
import { StockService } from './stock.service'; 
 
@Module({ 
  imports:[ServeStaticModule.forRoot({rootPath:join(__dirname, '../../src', 'ui')})], 
  controllers: [DrinkController,IngredientController, AppController], 
  providers: [DrinkService, StockService], 
}) 
export class AppModule {} 