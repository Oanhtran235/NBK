export type Category = 'Hộ nghèo' | 'Cận nghèo' | 'Học sinh dân tộc thiểu số' | 'Khuyết tật' | 'Mồ côi';

export interface HumanitarianAddress {
  id: string;
  name: string;
  studentClass: string;
  category: Category;
  address: string;
  needs: string[];
  status: 'Chưa hỗ trợ' | 'Đang hỗ trợ' | 'Đã hoàn thành';
  supporter?: string;
  contact: string;
  description: string;
}

export interface Stats {
  total: number;
  byCategory: Record<Category, number>;
  byStatus: Record<string, number>;
}
