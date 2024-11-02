import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString, Length, Min, ValidateNested } from "class-validator";

export class CreateOrderItemDto {
    
    @Type()
    @ApiProperty()
    @IsNumber()
    ticketId: number;
}

export class CreateOrderDto {

   @Type(() => CreateOrderItemDto)
   @ValidateNested({each: true})
   @ApiProperty({type: CreateOrderItemDto, isArray: true})
   items: CreateOrderItemDto[];

}