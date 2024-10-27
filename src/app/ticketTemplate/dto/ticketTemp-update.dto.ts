import { PartialType, PickType } from "@nestjs/swagger";
import { CreateTicketTempDto } from "./ticketTemp-create.dto";

export class UpdateTicketTempDto extends  PickType(PartialType(CreateTicketTempDto), [
    'quantity',
  ]) {

}