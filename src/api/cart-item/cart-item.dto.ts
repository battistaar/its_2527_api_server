import { IsInt, IsMongoId, IsNumber } from "class-validator";

export class CreateCartItemDto {
  @IsInt()
  quantity: number;

  @IsMongoId()
  productId: string;
}

export class UpdateCartItemDto {
    quantity: number;
}
