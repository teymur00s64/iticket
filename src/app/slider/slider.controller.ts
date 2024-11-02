import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGard } from "src/guards/auth.guard";
import { SliderService } from "./slider.service";

@Controller('slider')
@ApiBearerAuth()
@ApiTags('Slider')
export class SliderController {
    constructor (
        private sliderService: SliderService
    ) {}

    @Get()
    getSlider(@Query('id') id: number) {
        return this.sliderService.getSlider(id);
    }
    
}
