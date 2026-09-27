import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useShop();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let iconClass = 'toast-icon-success';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          iconClass = 'toast-icon-error';
        } else if (toast.type === 'info') {
          Icon = Info;
          iconClass = 'toast-icon-info';
        }

        return (
          <div key={toast.id} className={`toast-item toast-${toast.type}`}>
            <Icon size={18} className={iconClass} />
            <span className="toast-message">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="toast-close"
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
