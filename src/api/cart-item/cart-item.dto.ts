import { IsInt, IsMongoId, Min } from "class-validator";

export class CreateCartItemDto {
  @IsInt()
  @Min(1)
  quantity: number;

  @IsMongoId()
  productId: string;
}

export class UpdateCartItemDto {
  @IsInt()
  @Min(1)
  quantity: number;
}
