import type { Order, OrderHistory } from './types';

const STORAGE_KEY = 'workCafe_orderHistory';
const MAX_ORDERS = 5;

export function getOrderHistory(): OrderHistory {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading order history:', e);
  }

  return {
    orders: [],
    topItems: [],
    modifierPreferences: {}
  };
}

export function saveOrder(order: Order): void {
  try {
    const history = getOrderHistory();

    // Add new order at the beginning
    history.orders.unshift(order);

    // Keep only last MAX_ORDERS
    if (history.orders.length > MAX_ORDERS) {
      history.orders = history.orders.slice(0, MAX_ORDERS);
    }

    // Update top items
    const itemCounts: { [itemId: string]: number } = {};
    history.orders.forEach(o => {
      o.items.forEach(cartItem => {
        const id = cartItem.menuItem.id;
        itemCounts[id] = (itemCounts[id] || 0) + cartItem.quantity;
      });
    });

    history.topItems = Object.entries(itemCounts)
      .map(([itemId, count]) => ({ itemId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Update modifier preferences
    const modifierCounts: { [key: string]: number } = {};
    history.orders.forEach(o => {
      o.items.forEach(cartItem => {
        Object.entries(cartItem.selectedModifiers).forEach(([modId, optIds]) => {
          optIds.forEach(optId => {
            const key = `${modId}:${optId}`;
            modifierCounts[key] = (modifierCounts[key] || 0) + 1;
          });
        });
      });
    });

    // Store most common modifier per modifier group
    const prefs: { [modifierId: string]: string[] } = {};
    Object.entries(modifierCounts).forEach(([key, count]) => {
      const [modId, optId] = key.split(':');
      if (!prefs[modId]) {
        prefs[modId] = [];
      }
      prefs[modId].push(optId);
    });

    history.modifierPreferences = prefs;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (e) {
    console.error('Error saving order:', e);
  }
}

export function getLastOrder(): Order | null {
  const history = getOrderHistory();
  return history.orders[0] || null;
}

export function getRecommendedItems(): string[] {
  const history = getOrderHistory();
  return history.topItems.slice(0, 3).map(item => item.itemId);
}

export function getModifierPreferences(modifierId: string): string[] {
  const history = getOrderHistory();
  return history.modifierPreferences[modifierId] || [];
}
