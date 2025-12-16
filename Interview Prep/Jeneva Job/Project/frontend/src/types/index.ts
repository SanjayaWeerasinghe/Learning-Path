export interface UnitOfMeasure {
  id: string;
  code: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  code: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Warehouse {
  id: string;
  code: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  contactPerson?: string;
  contactPhone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Supplier {
  id: string;
  code: string;
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  taxId?: string;
  paymentTerms?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Material {
  id: string;
  code: string;
  name: string;
  description?: string;
  standardCost?: number;
  lastPurchasePrice?: number;
  stockQuantity: number;
  reorderLevel?: number;
  unitOfMeasure: UnitOfMeasure;
  unitOfMeasureId: string;
  category: Category;
  categoryId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum PurchasingRequestStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ORDERED = 'ORDERED',
  CANCELLED = 'CANCELLED',
}

export interface PurchasingRequestItem {
  id: string;
  purchasingRequestId: string;
  material: Material;
  materialId: string;
  quantity: number;
  estimatedPrice?: number;
  specifications?: string;
  orderedQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface PurchasingRequest {
  id: string;
  requestNumber: string;
  requestDate: string;
  requiredDate?: string;
  requestedBy: string;
  department?: string;
  status: PurchasingRequestStatus;
  notes?: string;
  approvedBy?: string;
  approvedDate?: string;
  items: PurchasingRequestItem[];
  createdAt: string;
  updatedAt: string;
}

export enum PurchasingOrderStatus {
  DRAFT = 'DRAFT',
  CONFIRMED = 'CONFIRMED',
  SENT_TO_SUPPLIER = 'SENT_TO_SUPPLIER',
  PARTIALLY_RECEIVED = 'PARTIALLY_RECEIVED',
  RECEIVED = 'RECEIVED',
  CANCELLED = 'CANCELLED',
}

export interface PurchasingOrderItem {
  id: string;
  purchasingOrderId: string;
  material: Material;
  materialId: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
  tax?: number;
  totalPrice: number;
  receivedQuantity: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PurchasingOrder {
  id: string;
  orderNumber: string;
  orderDate: string;
  expectedDeliveryDate?: string;
  supplier: Supplier;
  supplierId: string;
  status: PurchasingOrderStatus;
  totalAmount: number;
  paymentTerms?: string;
  deliveryAddress?: string;
  notes?: string;
  createdBy?: string;
  approvedBy?: string;
  approvedDate?: string;
  items: PurchasingOrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
