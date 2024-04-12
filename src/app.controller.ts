import { Controller, Sse } from '@nestjs/common'; 
import { interval, Observable } from 'rxjs'; 
import { map, switchMap } from 'rxjs/operators'; 
import { IngredientSchema } from '../data/dto/dto.objects';
import { StockService } from './stock.service'; 
 
interface MessageEvent{ 
    data:IngredientSchema[] 
} 
@Controller('api') 
export class AppController { 
constructor(private readonly stockService: StockService) {} 
   
  @Sse('sse') 
  sendEvent(): Observable<MessageEvent> { 
    return interval(100).pipe( 
      switchMap(() => this.stockService.fetchStock()), 
      map((stock: IngredientSchema[]) => ({ 
        data: stock,  
      })), 
    ); 
  } 
} 