export interface DetalleFacturaDTO {
  IdProducto: number;
  CantidadDeProducto: number;
  PrecioUnitarioProducto: number;
  SubtotalProducto: number;
  Notas?: string;
}

export interface FacturaCreateDTO {
  IdCliente: number;
  NumeroFactura: number;
  Detalles: DetalleFacturaDTO[];
}

export interface Factura {
  Id: number;
  FechaEmisionFactura: string;  
  IdCliente: number;
  NumeroFactura: number;
  NumeroTotalArticulos: number;
  SubTotalFacturas: number;
  TotalImpuestos: number;
  TotalFactura: number;
  Cliente: Cliente;
  Detalles: DetalleFactura[];
}

export interface FacturaCreateDTO {
  IdCliente: number;
  NumeroFactura: number;
  Detalles: DetalleFactura[];
}
export interface Cliente {
  Id: number;
  RazonSocial: string;
  RFC?: string;
  IdTipoCliente: number;
}

export interface DetalleFactura {
  IdProducto: number;
  CantidadDeProducto: number;
  PrecioUnitarioProducto: number;
  SubtotalProducto: number;
  Notas?: string;
}