export class UpdateProductCommand {
  constructor(
    public readonly productID: number,
    public readonly data: any
  ) {}
}
