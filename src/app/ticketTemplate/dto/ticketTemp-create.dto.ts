import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class CreateTicketTempDto {
    
    @Type()
    @ApiProperty()
    @IsNumber()
    price: number;

    @Type()
    @ApiProperty()
    @IsNumber()
    quantity: number;

    @Type()
    @ApiProperty()
    @IsNumber()
    eventId: number;
}