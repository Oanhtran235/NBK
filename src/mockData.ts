import { HumanitarianAddress, Category } from './types';

const categories: Category[] = [
  'Hộ nghèo',
  'Cận nghèo',
  'Học sinh dân tộc thiểu số',
  'Khuyết tật',
  'Mồ côi'
];

const needsPool = ['Xe đạp', 'Học bổng', 'Sách vở', 'Đồ dùng học tập', 'Hỗ trợ sinh hoạt', 'Máy tính'];
const statusPool = ['Chưa hỗ trợ', 'Đang hỗ trợ', 'Đã hoàn thành'] as const;
const supporterPool = [
  'Điện Thoại Phương Quang',
  'Tiệm Vàng Kim Bình',
  'Anh Sơn',
  'Hội cựu học sinh',
  'Quỹ khuyến học'
];

const studentData = [
  { name: 'Đoàn Nguyễn Anh Tú', class: '11A1' },
  { name: 'Lê Hải Long', class: '11A2' },
  { name: 'Trần Hoàng Kim Anh', class: '11A6' },
  { name: 'Vũ Thị Như Quỳnh', class: '11A7' },
  { name: 'Trần Thị Như Quỳnh', class: '11A9' },
  { name: 'Nguyễn Thị Thanh Hương', class: '12A3' },
  { name: 'Ma Khảo', class: '12A5' },
  { name: 'Kon Sa Ka Lý', class: '12A6' },
  { name: 'Quách Thị Ngọc Linh', class: '12A7' },
  { name: 'Bơ Ju Ma Nhơ', class: '12A9' },
  { name: 'Trần Quốc Trung', class: '11A1' },
  { name: 'Huỳnh Ngọc Thụy Quyên', class: '12A4' },
  { name: 'Bùi Quốc Minh Trí', class: '12A1' },
  { name: 'Nguyễn Tuấn Huân', class: '10A5' },
  { name: 'Dơ Woang Ria Men Chi', class: '10A3' },
  { name: 'Lưu Cẩm Nhân', class: '10A4' },
  { name: 'Kơ Să K\' Ngọc', class: '10A6' },
  { name: 'Lê Yên Phụng Sự', class: '10A7' },
  { name: 'Chóa Ra Chăm Nai Hạnh', class: '11A3' },
  { name: 'Phạm Thị Tuyết Nhung', class: '11A4' },
  { name: 'Kơ Să KLàng', class: '11A5' },
  { name: 'Jrăi Strong', class: '11A8' },
  { name: 'Trần Quốc Tính', class: '12A2' },
  { name: 'Phạm Thị Thúy Vy', class: '12A8' },
  { name: 'Nguyễn Huy Diễn', class: '10A1' },
  { name: 'Dơ Woang Ruy Phiến Nai Ên Ên', class: '10A9' },
  { name: 'Nguyễn Bảo Trân', class: '11A7' },
  { name: 'Nguyễn Thị Ngọc Tâm', class: '11A9' },
  { name: 'Lộc Nguyễn Bảo Nhi', class: '12A7' },
  { name: 'Trần Ngọc Bảo Vy', class: '10A1' },
  { name: 'Lê Thị Trà My', class: '10A8' },
  { name: 'Lâm Thị Bích Mai', class: '11A2' },
  { name: 'Lương Thùy Trâm', class: '11A6' },
  { name: 'Hứa Ngọc Thủy Tiên', class: '12A9' },
  { name: 'Ma Na Nai Mến', class: '10A5' },
  { name: 'Đặng Vũ Tường Vy', class: '10A7' },
  { name: 'Dơ Wang Prong Giô En', class: '11A4' },
  { name: 'Phan Gia Bảo', class: '11A8' },
  { name: 'Nguyễn Thị Hiền', class: '11A9' },
  { name: 'Hồ Thị Thanh Thủy', class: '12A4' },
  { name: 'Ma Tiếm', class: '12A8' },
  { name: 'Bùi Ngọc Mỹ Duyên', class: '12A9' },
  { name: 'Đào Thị Phương Nhung', class: '10A1' },
  { name: 'Xa Ra', class: '10A2' },
  { name: 'Ma Hiên', class: '10A3' },
  { name: 'Lê Kim Hiếu', class: '10A4' },
  { name: 'Ma Diễm', class: '10A5' },
  { name: 'Cil Bùi Hải Đăng', class: '10A6' },
  { name: 'Ma Nghĩa', class: '10A7' },
  { name: 'Jơ Rơng Misa', class: '10A8' },
  { name: 'Ya Đam', class: '10A9' },
  { name: 'Bơ Nah Ria Ma Nền', class: '11A1' },
  { name: 'Nguyễn Cẩm Ly', class: '11A4' },
  { name: 'Klong Kiều Diễm', class: '11A5' },
  { name: 'Trần Hữu Nguyên', class: '11A6' },
  { name: 'Đỗ Thị Thảo Uyên', class: '11A7' },
  { name: 'Kon Sơ My Na', class: '11A8' },
  { name: 'Kơ Tơ Ya Triển', class: '11A9' },
  { name: 'Trần Bùi Hồng Anh', class: '12A1' },
  { name: 'Đào Minh Trường', class: '12A2' },
  { name: 'Lâm Ngọc Quỳnh Như', class: '12A4' },
  { name: 'Ma Lan', class: '12A5' },
  { name: 'Dơ Woang Ma Líng', class: '12A6' },
  { name: 'Bùi Lưu Thuý Hiền', class: '12A7' },
  { name: 'Ya Hướng', class: '12A8' },
  { name: 'Ka lém', class: '12A9' },
  { name: 'Nguyễn Văn A', class: '10A1' },
  { name: 'Trần Thị B', class: '10A2' },
  { name: 'Lê Văn C', class: '10A3' },
  { name: 'Phạm Thị D', class: '10A4' },
  { name: 'Hoàng Văn E', class: '10A5' },
  { name: 'Ngô Thị F', class: '10A6' },
  { name: 'Vũ Văn G', class: '10A7' },
  { name: 'Đặng Thị H', class: '10A8' },
  { name: 'Bùi Văn I', class: '10A9' },
  { name: 'Lý Thị K', class: '11A1' },
  { name: 'Chu Văn L', class: '11A2' },
  { name: 'Đỗ Thị M', class: '11A3' },
  { name: 'Trịnh Văn N', class: '11A4' },
  { name: 'Phùng Thị O', class: '11A5' },
  { name: 'Mai Văn P', class: '11A6' },
  { name: 'Đào Thị Q', class: '11A7' },
  { name: 'Hà Văn R', class: '11A8' },
  { name: 'Lương Thị S', class: '11A9' },
  { name: 'Tạ Văn T', class: '12A1' },
  { name: 'Vương Thị U', class: '12A2' },
  { name: 'Đinh Văn V', class: '12A3' },
  { name: 'Quách Thị X', class: '12A4' },
  { name: 'Trần Văn Y', class: '12A5' },
  { name: 'Nguyễn Thị Z', class: '12A6' },
  { name: 'Lê Văn An', class: '10A1' },
  { name: 'Trần Thị Bình', class: '10A2' },
  { name: 'Nguyễn Văn Cường', class: '10A3' },
  { name: 'Lê Thị Diễm', class: '10A4' },
  { name: 'Trần Văn Dũng', class: '10A5' },
  { name: 'Nguyễn Thị Hoa', class: '10A6' },
  { name: 'Lê Văn Hùng', class: '10A7' },
  { name: 'Trần Thị Lan', class: '10A8' },
  { name: 'Nguyễn Văn Minh', class: '10A9' },
  { name: 'Lê Thị Nga', class: '11A1' },
  { name: 'Trần Văn Nam', class: '11A2' },
  { name: 'Nguyễn Thị Oanh', class: '11A3' },
  { name: 'Lê Văn Phúc', class: '11A4' },
  { name: 'Trần Thị Quỳnh', class: '11A5' },
  { name: 'Nguyễn Văn Sơn', class: '11A6' },
  { name: 'Lê Thị Thảo', class: '11A7' },
  { name: 'Trần Văn Tuấn', class: '11A8' },
  { name: 'Nguyễn Thị Uyên', class: '11A9' },
  { name: 'Lê Văn Việt', class: '12A1' },
  { name: 'Trần Thị Xuân', class: '12A2' },
  { name: 'Nguyễn Văn Yên', class: '12A3' }
];

const targetCounts = [
  Math.floor(Math.random() * 4) + 10, // 10-13
  Math.floor(Math.random() * 4) + 10,
  Math.floor(Math.random() * 4) + 10,
  Math.floor(Math.random() * 4) + 10,
];
const currentCounts = [0, 0, 0, 0];

export const mockAddresses: HumanitarianAddress[] = Array.from({ length: 249 }, (_, i) => {
  const id = `HN-${(i + 1).toString().padStart(3, '0')}`;
  const status = statusPool[Math.floor(Math.random() * statusPool.length)];
  
  // Assign categories based on specific counts
  let category: Category;
  if (i < 8) category = 'Hộ nghèo';
  else if (i < 22) category = 'Cận nghèo';
  else if (i < 243) category = 'Học sinh dân tộc thiểu số';
  else if (i < 247) category = 'Khuyết tật';
  else category = 'Mồ côi';

  // Use real data if available, otherwise generate
  const realData = studentData[i % studentData.length];
  const name = i < studentData.length ? realData.name : `${realData.name} (Gia đình ${Math.floor(i / studentData.length)})`;
  const studentClass = realData.class;
  
  let supporter;
  if (status !== 'Chưa hỗ trợ') {
    const supporterIndex = Math.floor(Math.random() * supporterPool.length);
    if (supporterIndex < 4) {
      if (currentCounts[supporterIndex] < targetCounts[supporterIndex]) {
        supporter = supporterPool[supporterIndex];
        currentCounts[supporterIndex]++;
      } else {
        supporter = 'Quỹ khuyến học';
      }
    } else {
      supporter = 'Quỹ khuyến học';
    }
  }

  return {
    id,
    name,
    studentClass,
    category,
    address: `Thôn ${Math.floor(Math.random() * 5) + 1}, Xã Tà Hine, Huyện Đức Trọng, Tỉnh Lâm Đồng`,
    needs: Array.from({ length: Math.floor(Math.random() * 2) + 1 }, () => needsPool[Math.floor(Math.random() * needsPool.length)]),
    status,
    supporter,
    contact: `09${Math.floor(10000000 + Math.random() * 90000000)}`,
    description: `Hoàn cảnh gia đình khó khăn, thuộc diện ${category.toLowerCase()}.`
  };
});

export const getSupporters = () => {
  return supporterPool.map(name => {
    const supportedCount = mockAddresses.filter(addr => addr.supporter === name).length;
    return { name, supportedCount };
  });
};

export const getStats = () => {
  const stats = {
    total: mockAddresses.length,
    byCategory: {} as Record<Category, number>,
    byStatus: {} as Record<string, number>
  };

  mockAddresses.forEach(addr => {
    stats.byCategory[addr.category] = (stats.byCategory[addr.category] || 0) + 1;
    stats.byStatus[addr.status] = (stats.byStatus[addr.status] || 0) + 1;
  });

  return stats;
};
