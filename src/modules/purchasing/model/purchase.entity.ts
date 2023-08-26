import { ObjectId } from "mongodb";

export interface PurchaseInterface {
  _id?: string | ObjectId;
  date?: string;
  purchaseInvoiceNumber?: string;
  purchaseReceive?: {
    _id: string | ObjectId;
    number: string;
  };
  purchaseOrder?: {
    _id: string | ObjectId;
    number: string;
  };
  taxBase?: string;
  tax?: string;
  total?: string;
  notes?: string;
  approvalStatus?: string;
  formStatus?: string;
  warehouse?: {
    _id: string | ObjectId;
    code: string;
    name: string;
  };
  supplier?: {
    _id: string | ObjectId;
    code: string;
    name: string;
  };
  createdBy?: {
    _id: string | ObjectId;
    name: string;
  };
  items?: ItemInterface[];
}

interface ItemInterface {
  _id?: string | ObjectId;
  code?: string;
  name?: string;
  quantity?: number;
  unit?: string;
  price?: number;
  discount?: number;
  subtotal?: number;
}

export interface PurchaseRecapReportInterface {
  _id: string | ObjectId;
  invoiceNumber?: string;
  date?: string;
  supplier?: {
    name?: string;
  };
  purchaseReceive?: {
    number?: string;
  };
  notes?: string;
  taxBase?: string;
  tax?: string;
  total?: string;
}

export interface PurchaseReportInterface {
  _id: string;
  purchaseOrder?: {
    number?: string | null;
  };
  invoiceNumber?: string;
  date?: Date;
  warehouse?: {
    code?: string;
    name?: string;
  };
  supplier?: {
    code?: string;
    name?: string;
  };
  item?: {
    code?: string;
    name?: string;
  };
  notes?: string;
  quantity?: number;
  unit?: string;
  price?: number;
  discount?: number;
  tax?: number;
  total?: number;
}
