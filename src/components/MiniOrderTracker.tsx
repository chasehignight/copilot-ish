import { useState, useEffect } from 'react';
import type { Order } from '../widgets/workCafe/types';

interface MiniOrderTrackerProps {
  order: Order;
}

export function MiniOrderTracker({ order }: MiniOrderTrackerProps) {
  const [status, setStatus] = useState<Order['status']>('received');

  useEffect(() => {
    setStatus('received');

    // Match the timing from WorkCafeWidget
    const timer1 = setTimeout(() => setStatus('preparing'), 6000);
    const timer2 = setTimeout(() => setStatus('ready'), 15000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [order.id]);

  const getStatusIcon = () => {
    if (status === 'ready') return '✅';
    if (status === 'preparing') return '👨‍🍳';
    return '📝';
  };

  const getStatusText = () => {
    if (status === 'ready') return 'Order Ready!';
    if (status === 'preparing') return 'Preparing...';
    return 'Order Received';
  };

  const getStatusColor = () => {
    if (status === 'ready') return 'bg-green-100 text-green-700 border-green-300';
    if (status === 'preparing') return 'bg-orange-100 text-orange-700 border-orange-300';
    return 'bg-blue-100 text-blue-700 border-blue-300';
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${getStatusColor()} animate-pulse`}>
      <span className="text-sm">{getStatusIcon()}</span>
      <div className="flex flex-col">
        <span className="text-xs font-semibold">{getStatusText()}</span>
        <span className="text-xs opacity-75">{order.pickupTime}</span>
      </div>

      {/* Mini progress bar */}
      <div className="flex items-center gap-1 ml-2">
        <div className={`w-2 h-2 rounded-full ${status === 'received' || status === 'preparing' || status === 'ready' ? 'bg-current' : 'bg-gray-300'}`} />
        <div className={`w-2 h-2 rounded-full ${status === 'preparing' || status === 'ready' ? 'bg-current' : 'bg-gray-300'}`} />
        <div className={`w-2 h-2 rounded-full ${status === 'ready' ? 'bg-current' : 'bg-gray-300'}`} />
      </div>
    </div>
  );
}
