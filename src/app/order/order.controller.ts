import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { OrderService } from "./order.service";
import { AuthGard } from "src/guards/auth.guard";
import { GetOrderDto } from "./dto/get-order.dto";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller('order')
@ApiBearerAuth()
@ApiTags('Order')
export class OrderController {
    constructor (
        private orderService: OrderService
    ) {}


    @Get()
    @UseGuards(AuthGard)
    find(@Query() query: GetOrderDto) {
        return this.orderService.find({...query, relations: ['tickets']})
    }

    @Post()
    @UseGuards(AuthGard)
    create(@Body() body:CreateOrderDto ) {
        return this.orderService.create(body)
    }
}

// 1.finish ticket and order