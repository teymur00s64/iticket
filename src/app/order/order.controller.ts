// import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
// import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
// import { OrderService } from "./order.service";
// import { AuthGard } from "src/guards/auth.guard";
// import { GetOrderDto } from "./dto/get-order.dto";
// import { CreateOrderDto } from "./dto/create-order.dto";

// @Controller('order')
// @ApiBearerAuth()
// @ApiTags('Order')
// export class OrderController {
//     constructor (
//         private orderService: OrderService
//     ) {}


//     @Get()
//     @UseGuards(AuthGard)
//     find(@Query() query: GetOrderDto) {
//         const pagination = {limit: query.limit || 5, page: query.page || 0}
//         return this.orderService.find({pagination, relations: ['items']})
//     }

//     @Post()
//     @UseGuards(AuthGard)
//     create(@Body() body:CreateOrderDto ) {
//         return this.orderService.create(body)
//     }
// }