import React, { useState, useEffect } from 'react';
import { MENU_ITEMS } from './mockMenu';
import type { MenuItem, CartItem, Order, Category } from './types';
import { saveOrder, getLastOrder, getRecommendedItems, getModifierPreferences } from './storage';

interface WorkCafeWidgetProps {
  onClose: () => void;
  onOrderPlaced?: (order: Order) => void;
}

type View = 'menu' | 'item-detail' | 'cart' | 'order-status';

export function WorkCafeWidget({ onClose, onOrderPlaced }: WorkCafeWidgetProps) {
  const [view, setView] = useState<View>('menu');
  const [selectedCategory, setSelectedCategory] = useState<Category>('breakfast');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orderStatus, setOrderStatus] = useState<Order['status']>('received');
  const [searchQuery, setSearchQuery] = useState('');

  // Item customization state
  const [quantity, setQuantity] = useState(1);
  const [selectedModifiers, setSelectedModifiers] = useState<{ [modifierId: string]: string[] }>({});
  const [specialInstructions, setSpecialInstructions] = useState('');

  const categories: { id: Category; label: string; icon: string }[] = [
    { id: 'breakfast', label: 'Breakfast', icon: '🍳' },
    { id: 'lunch', label: 'Lunch', icon: '🥗' },
    { id: 'coffee', label: 'Coffee', icon: '☕' },
    { id: 'snacks', label: 'Snacks', icon: '🍪' }
  ];

  const lastOrder = getLastOrder();
  const recommendedItemIds = getRecommendedItems();

  // Filter menu items
  const filteredItems = MENU_ITEMS.filter(item => {
    if (item.category !== selectedCategory) return false;
    if (searchQuery) {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const recommendedItems = MENU_ITEMS.filter(item => recommendedItemIds.includes(item.id));

  // Calculate cart total
  const cartTotal = cart.reduce((sum, item) => sum + item.itemTotal, 0);

  // Open item detail
  const openItemDetail = (item: MenuItem) => {
    setSelectedItem(item);
    setQuantity(1);
    setSpecialInstructions('');

    // Pre-fill modifiers with preferences
    const prefs: { [modifierId: string]: string[] } = {};
    item.modifiers.forEach(mod => {
      const savedPrefs = getModifierPreferences(mod.id);
      if (savedPrefs.length > 0) {
        if (mod.type === 'single') {
          prefs[mod.id] = [savedPrefs[0]];
        } else {
          prefs[mod.id] = savedPrefs;
        }
      } else if (mod.required && mod.options.length > 0) {
        prefs[mod.id] = [mod.options[0].id];
      }
    });
    setSelectedModifiers(prefs);
    setView('item-detail');
  };

  // Calculate item total
  const calculateItemTotal = (item: MenuItem, mods: { [modifierId: string]: string[] }, qty: number): number => {
    let total = item.price;
    item.modifiers.forEach(modifier => {
      const selected = mods[modifier.id] || [];
      selected.forEach(optId => {
        const option = modifier.options.find(o => o.id === optId);
        if (option) {
          total += option.price;
        }
      });
    });
    return total * qty;
  };

  // Add to cart
  const addToCart = () => {
    if (!selectedItem) return;

    // Validate required modifiers
    const missingRequired = selectedItem.modifiers.some(
      mod => mod.required && (!selectedModifiers[mod.id] || selectedModifiers[mod.id].length === 0)
    );

    if (missingRequired) {
      alert('Please select all required options');
      return;
    }

    const cartItem: CartItem = {
      menuItem: selectedItem,
      quantity,
      selectedModifiers: { ...selectedModifiers },
      specialInstructions: specialInstructions || undefined,
      itemTotal: calculateItemTotal(selectedItem, selectedModifiers, quantity)
    };

    setCart([...cart, cartItem]);
    setView('menu');
    setSelectedItem(null);
  };

  // Remove from cart
  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  // Place order
  const placeOrder = (pickupTime: string) => {
    const order: Order = {
      id: `order-${Date.now()}`,
      items: [...cart],
      pickupTime,
      total: cartTotal,
      timestamp: Date.now(),
      status: 'received'
    };

    saveOrder(order);
    setCurrentOrder(order);
    setOrderStatus('received');
    setCart([]);
    setView('order-status');

    // Notify parent component
    onOrderPlaced?.(order);

    console.log(`Placed Work Cafe order: ${order.items.length} items, total $${order.total.toFixed(2)}`);

    // Mock status progression (slowed down)
    setTimeout(() => setOrderStatus('preparing'), 6000);  // 6 seconds
    setTimeout(() => setOrderStatus('ready'), 15000);     // 15 seconds
  };

  // Reorder last order
  const reorderLast = () => {
    if (!lastOrder) return;
    setCart([...lastOrder.items]);
    setView('cart');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="flex items-center gap-3">
            <span className="text-3xl">☕</span>
            <h2 className="text-2xl font-bold text-white">Work Cafe</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {view === 'menu' && (
            <div className="p-6">
              {/* Reorder last order */}
              {lastOrder && (
                <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-indigo-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">Reorder Your Favorite</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {lastOrder.items.length} items • ${lastOrder.total.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={reorderLast}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Reorder
                    </button>
                  </div>
                </div>
              )}

              {/* Recommended items */}
              {recommendedItems.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Recommended for You</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {recommendedItems.map(item => (
                      <button
                        key={item.id}
                        onClick={() => openItemDetail(item)}
                        className="text-left p-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all"
                      >
                        <div className="text-sm font-semibold text-gray-900 mb-1">{item.name}</div>
                        <div className="text-xs text-indigo-600 font-medium">${item.price.toFixed(2)}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search menu..."
                    className="w-full px-4 py-2 pl-10 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Category tabs */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>

              {/* Menu items */}
              <div className="space-y-3">
                {filteredItems.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>No items found</p>
                  </div>
                ) : (
                  filteredItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => openItemDetail(item)}
                      className="w-full text-left p-4 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 mb-1">{item.name}</div>
                          <div className="text-sm text-gray-600 mb-2">{item.description}</div>
                          {item.dietaryFlags.length > 0 && (
                            <div className="flex gap-2 flex-wrap">
                              {item.dietaryFlags.map(flag => (
                                <span key={flag} className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                                  {flag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="ml-4 font-semibold text-indigo-600">${item.price.toFixed(2)}</div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {view === 'item-detail' && selectedItem && (
            <div className="p-6">
              <button
                onClick={() => setView('menu')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedItem.name}</h2>
              <p className="text-gray-600 mb-4">{selectedItem.description}</p>
              <div className="text-xl font-bold text-indigo-600 mb-6">${selectedItem.price.toFixed(2)}</div>

              {/* Modifiers */}
              <div className="space-y-6 mb-6">
                {selectedItem.modifiers.map(modifier => (
                  <div key={modifier.id} className="border-b border-gray-200 pb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      {modifier.name}
                      {modifier.required && <span className="text-red-500 ml-1">*</span>}
                    </h3>
                    <div className="space-y-2">
                      {modifier.options.map(option => {
                        const isSelected = selectedModifiers[modifier.id]?.includes(option.id) || false;
                        return (
                          <label
                            key={option.id}
                            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                              isSelected
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <input
                                  type={modifier.type === 'single' ? 'radio' : 'checkbox'}
                                  name={modifier.id}
                                  checked={isSelected}
                                  onChange={(e) => {
                                    const newMods = { ...selectedModifiers };
                                    if (modifier.type === 'single') {
                                      newMods[modifier.id] = [option.id];
                                    } else {
                                      if (e.target.checked) {
                                        newMods[modifier.id] = [...(newMods[modifier.id] || []), option.id];
                                      } else {
                                        newMods[modifier.id] = (newMods[modifier.id] || []).filter(id => id !== option.id);
                                      }
                                    }
                                    setSelectedModifiers(newMods);
                                  }}
                                  className="sr-only"
                                />
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                  isSelected
                                    ? 'border-indigo-600 bg-indigo-600'
                                    : 'border-gray-300 bg-white'
                                }`}>
                                  {isSelected && (
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                  )}
                                </div>
                              </div>
                              <span className={`font-medium ${isSelected ? 'text-indigo-900' : 'text-gray-900'}`}>
                                {option.name}
                              </span>
                            </div>
                            {option.price > 0 && (
                              <span className={`text-sm font-medium ${isSelected ? 'text-indigo-700' : 'text-gray-600'}`}>
                                +${option.price.toFixed(2)}
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Special instructions */}
              <div className="mb-6">
                <label className="block font-semibold text-gray-900 mb-2">Special Instructions</label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any special requests?"
                  rows={3}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                />
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block font-semibold text-gray-900 mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="text-xl font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Add to cart button */}
              <button
                onClick={addToCart}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Add to Cart • ${calculateItemTotal(selectedItem, selectedModifiers, quantity).toFixed(2)}
              </button>
            </div>
          )}

          {view === 'cart' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h2>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-gray-600 mb-4">Your cart is empty</p>
                  <button
                    onClick={() => setView('menu')}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart items */}
                  <div className="space-y-4 mb-6">
                    {cart.map((item, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{item.menuItem.name}</div>
                            <div className="text-sm text-gray-600 mt-1">
                              {Object.entries(item.selectedModifiers).map(([modId, optIds]) => {
                                const modifier = item.menuItem.modifiers.find(m => m.id === modId);
                                if (!modifier) return null;
                                const optionNames = optIds.map(optId => {
                                  const opt = modifier.options.find(o => o.id === optId);
                                  return opt?.name;
                                }).filter(Boolean);
                                return optionNames.length > 0 ? `${modifier.name}: ${optionNames.join(', ')}` : null;
                              }).filter(Boolean).join(' • ')}
                            </div>
                            {item.specialInstructions && (
                              <div className="text-sm text-gray-500 italic mt-1">
                                Note: {item.specialInstructions}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(index)}
                            className="text-red-500 hover:text-red-700 ml-4"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                          <span className="font-semibold text-indigo-600">${item.itemTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pickup time */}
                  <div className="mb-6">
                    <label className="block font-semibold text-gray-900 mb-2">Pickup Time</label>
                    <select
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none cursor-pointer"
                      defaultValue="asap"
                      id="pickup-time"
                    >
                      <option value="asap">ASAP (15-20 min)</option>
                      <option value="30">In 30 minutes</option>
                      <option value="60">In 1 hour</option>
                      <option value="90">In 1.5 hours</option>
                    </select>
                  </div>

                  {/* Total */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex items-center justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-indigo-600">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setView('menu')}
                      className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Add More
                    </button>
                    <button
                      onClick={() => {
                        const select = document.getElementById('pickup-time') as HTMLSelectElement;
                        const timeValue = select.value;
                        const timeMap: { [key: string]: string } = {
                          'asap': 'ASAP (15-20 min)',
                          '30': 'In 30 minutes',
                          '60': 'In 1 hour',
                          '90': 'In 1.5 hours'
                        };
                        placeOrder(timeMap[timeValue] || 'ASAP');
                      }}
                      className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      Place Order
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {view === 'order-status' && currentOrder && (
            <div className="p-6">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">
                  {orderStatus === 'received' && '📝'}
                  {orderStatus === 'preparing' && '👨‍🍳'}
                  {orderStatus === 'ready' && '✅'}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {orderStatus === 'received' && 'Order Received!'}
                  {orderStatus === 'preparing' && 'Preparing Your Order'}
                  {orderStatus === 'ready' && 'Order Ready!'}
                </h2>
                <p className="text-gray-600">
                  {orderStatus === 'received' && 'We\'ve got your order and will start preparing it shortly'}
                  {orderStatus === 'preparing' && 'Your delicious food is being prepared'}
                  {orderStatus === 'ready' && 'Your order is ready for pickup!'}
                </p>
              </div>

              {/* Status tracker */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex-1 text-center ${orderStatus === 'received' || orderStatus === 'preparing' || orderStatus === 'ready' ? 'text-indigo-600' : 'text-gray-400'}`}>
                    <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${orderStatus === 'received' || orderStatus === 'preparing' || orderStatus === 'ready' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
                      1
                    </div>
                    <div className="text-xs font-medium">Received</div>
                  </div>
                  <div className={`flex-1 h-1 ${orderStatus === 'preparing' || orderStatus === 'ready' ? 'bg-indigo-600' : 'bg-gray-200'}`} />
                  <div className={`flex-1 text-center ${orderStatus === 'preparing' || orderStatus === 'ready' ? 'text-indigo-600' : 'text-gray-400'}`}>
                    <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${orderStatus === 'preparing' || orderStatus === 'ready' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
                      2
                    </div>
                    <div className="text-xs font-medium">Preparing</div>
                  </div>
                  <div className={`flex-1 h-1 ${orderStatus === 'ready' ? 'bg-indigo-600' : 'bg-gray-200'}`} />
                  <div className={`flex-1 text-center ${orderStatus === 'ready' ? 'text-indigo-600' : 'text-gray-400'}`}>
                    <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${orderStatus === 'ready' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
                      3
                    </div>
                    <div className="text-xs font-medium">Ready</div>
                  </div>
                </div>
              </div>

              {/* Order details */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Order Details</h3>
                <div className="space-y-2 mb-4">
                  {currentOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.quantity}x {item.menuItem.name}</span>
                      <span className="text-gray-900 font-medium">${item.itemTotal.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-indigo-600">${currentOrder.total.toFixed(2)}</span>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  Pickup: {currentOrder.pickupTime}
                </div>
              </div>

              {/* Actions */}
              <button
                onClick={() => {
                  setView('menu');
                  setCurrentOrder(null);
                }}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                {orderStatus === 'ready' ? 'Order Another' : 'Back to Menu'}
              </button>
            </div>
          )}
        </div>

        {/* Footer - Cart badge */}
        {view !== 'cart' && view !== 'order-status' && cart.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-white">
            <button
              onClick={() => setView('cart')}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              View Cart ({cart.length}) • ${cartTotal.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
