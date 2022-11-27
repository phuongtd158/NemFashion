interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const MenuItems: RouteInfo[] = [
    {path: '/dashboard', title: 'Tổng quan', icon: 'fas fa-globe-asia', class: ''},
    {path: '/statical' , title: 'Thống kê' , icon: 'fas fa-chart-pie' , class: ''},
    {path: '/staff', title: 'Nhân viên', icon: 'fas fa-user-tie', class: ''},
    {path: '/customer', title: 'Khách hàng', icon: 'fas fa-users', class: ''},
    {path: '/order', title: 'Đơn hàng', icon: 'fas fa-clipboard', class: ''},
    {path: '/product', title: 'Sản phẩm', icon: 'fas fa-box', class: ''},
    {path: '/category', title: 'Danh mục', icon: 'fas fa-th-list', class: ''},
    {path: '/rating' , title: 'Đánh giá' , icon: 'fas fa-star' , class: '' }
]
