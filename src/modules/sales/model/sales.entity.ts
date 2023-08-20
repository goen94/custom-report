import { ObjectId } from "mongodb";

export interface SalesInterface {
  _id?: string | ObjectId;
  date?: Date;
  salesInvoiceNumber?: string;
  deliveryNote?: {
    _id: string | ObjectId;
    number: string;
  };
  salesOrder?: {
    _id: string | ObjectId;
    number: string;
  };
  taxBase?: string;
  tax?: string;
  total?: string;
  notes?: string;
  approvalStatus?: "pending" | "approved" | "rejected";
  formStatus?: "pending" | "done";
  payment?: {
    _id: string | ObjectId;
    paid: number;
    number: string;
  };
  memoJournal?: {
    _id: string | ObjectId;
    debit: number;
    number: string;
  };
  warehouse?: {
    _id: string | ObjectId;
    code: string;
    name: string;
  };
  customer?: {
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

export interface SalesRecapReportInterface {
  _id: string | ObjectId;
  invoiceNumber?: string;
  date?: Date;
  customer?: {
    name?: string;
  };
  warehouse?: {
    name?: string;
  };
  deliveryNote?: {
    number?: string;
  };
  notes?: string;
  taxBase?: string;
  tax?: string;
  total?: string;
  items?: ItemInterface[];
}

export interface SalesReportInterface {
  _id: string;
  deliveryNote?: {
    number?: string | null;
  };
  invoiceNumber?: string;
  date?: Date;
  salesOrder?: {
    number?: string | null;
  };
  warehouse?: {
    code?: string;
    name?: string;
  };
  customer?: {
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
