import { toast } from 'sonner';

// Toast utility functions for consistent messaging in Farsi
export const showToast = {
  success: (message: string) => {
    toast.success(message);
  },
  
  error: (message: string) => {
    toast.error(message);
  },
  
  warning: (message: string) => {
    toast.warning(message);
  },
  
  info: (message: string) => {
    toast.info(message);
  },
  
  loading: (message: string) => {
    return toast.loading(message);
  },
  
  dismiss: (toastId?: string | number) => {
    toast.dismiss(toastId);
  },
  
  // Specific ecommerce toasts in Farsi
  addedToCart: (productName: string) => {
    toast.success(`${productName} به سبد خرید اضافه شد!`);
  },
  
  removedFromCart: (productName: string) => {
    toast.success(`${productName} از سبد خرید حذف شد!`);
  },
  
  cartUpdated: () => {
    toast.success('سبد خرید با موفقیت به‌روزرسانی شد!');
  },
  
  orderPlaced: (orderId: string) => {
    toast.success(`سفارش #${orderId} با موفقیت ثبت شد!`);
  },
  
  loginSuccess: (userName: string) => {
    toast.success(`خوش آمدید، ${userName}!`);
  },
  
  logoutSuccess: () => {
    toast.success('با موفقیت خارج شدید!');
  },
  
  profileUpdated: () => {
    toast.success('پروفایل با موفقیت به‌روزرسانی شد!');
  },
  
  passwordChanged: () => {
    toast.success('رمز عبور با موفقیت تغییر کرد!');
  },
  
  // Error toasts in Farsi
  loginFailed: () => {
    toast.error('ورود ناموفق. لطفاً اطلاعات خود را بررسی کنید.');
  },
  
  registrationFailed: () => {
    toast.error('ثبت‌نام ناموفق. لطفاً دوباره تلاش کنید.');
  },
  
  cartError: () => {
    toast.error('خطا در به‌روزرسانی سبد خرید. لطفاً دوباره تلاش کنید.');
  },
  
  orderFailed: () => {
    toast.error('خطا در ثبت سفارش. لطفاً دوباره تلاش کنید.');
  },
  
  networkError: () => {
    toast.error('خطای شبکه. لطفاً اتصال خود را بررسی کنید.');
  },
  
  serverError: () => {
    toast.error('خطای سرور. لطفاً بعداً دوباره تلاش کنید.');
  },
};
