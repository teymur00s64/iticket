import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Venue } from "src/database/entities/Venue.entity";
import { VenueController } from "./venue.controller";
import { VenueService } from "./venue.service";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Venue])],
  controllers: [VenueController],
  providers: [VenueService],
  exports: [VenueService],
})
export class VenueModule {}
