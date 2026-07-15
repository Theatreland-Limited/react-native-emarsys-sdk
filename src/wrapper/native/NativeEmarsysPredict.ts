import { TurboModuleRegistry, type TurboModule } from 'react-native';
import type { UnsafeObject } from 'react-native/Libraries/Types/CodegenTypes';

export interface Spec extends TurboModule {
  trackCart(items: CartItem[]): Promise<void>;
  trackPurchase(orderId: string, items: CartItem[]): Promise<void>;
  trackItemView(itemId: string): Promise<void>;
  trackCategoryView(categoryPath: string): Promise<void>;
  trackSearchTerm(searchTerm: string): Promise<void>;
  trackTag(tag: string, attributes?: UnsafeObject | null): Promise<void>;
  // Use `UnsafeObject` so these object params map to `NSDictionary` on iOS rather than a generated
  // `JS::NativeEmarsys::{type}` struct. RN 0.85+ codegen rejects `Type | UnsafeObject` unions
  // (UnsupportedTypeAnnotationParserError). The typed `Logic`/`Product` shapes are still enforced
  // by the public wrapper in predict.ts.
  recommendProducts(logic: UnsafeObject, filters?: Filter[] | null, limit?: number | null, availabilityZone?: string | null): Promise<Product[]>;
  trackRecommendationClick(product: UnsafeObject): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeEmarsysPredict'
);

export type CartItem = {
  itemId: string;
  price: number;
  quantity: number;
};

export type Logic = {
  name: string;
  query?: string | null;
  cartItems?: CartItem[] | null;
  variants?: string[] | null;
};

export type Filter = {
  type: string;
  field: string;
  comparison: string;
  expectations: string[];
};

export type Product = {
  productId: string;
  title: string;
  linkUrl: string;
  feature: string;
  cohort: string;
  customFields: UnsafeObject;
  imageUrl?: string | null;
  zoomImageUrl?: string | null;
  categoryPath?: string | null;
  available?: boolean | null;
  productDescription?: string | null;
  price?: number | null;
  msrp?: number | null;
  album?: string | null;
  actor?: string | null;
  artist?: string | null;
  author?: string | null;
  brand?: string | null;
  year?: number | null;
};
