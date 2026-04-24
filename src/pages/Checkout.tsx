import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Lock, CreditCard, Building2, Wallet } from 'lucide-react';
import { useCartStore, formatPrice } from '../store/cartStore';
import { CheckoutForm } from '../types';
import Logo from '../components/Logo';

type Step = 'contact' | 'shipping' | 'payment';

const steps: { id: Step; label: string }[] = [
  { id: 'contact', label: 'Contacto' },
  { id: 'shipping', label: 'Envío' },
  { id: 'payment', label: 'Pago' },
];

const emptyForm: CheckoutForm = {
  firstName: '', lastName: '', email: '', phone: '',
  address: '', city: '', province: '', postalCode: '',
  paymentMethod: '',
  cardNumber: '', cardName: '', cardExpiry: '', cardCvc: '',
};

const paymentOptions = [
  { id: 'debito', label: 'Tarjeta de débito', icon: Wallet, desc: 'Visa Débito, Maestro' },
  { id: 'credito', label: 'Tarjeta de crédito', icon: CreditCard, desc: 'Visa, Mastercard, Amex' },
  { id: 'transferencia', label: 'Transferencia bancaria', icon: Building2, desc: 'CBU / CVU / Alias' },
] as const;

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>('contact');
  const [form, setForm] = useState<CheckoutForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});

  const total = getTotalPrice();
  const shipping = total >= 50000 ? 0 : 3500;

  if (items.length === 0) {
    return (
      <div className="pt-32 min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="font-serif text-2xl text-luxury-black">Tu bolsa está vacía</p>
        <Link to="/catalogo" className="btn-primary">Ver catálogo</Link>
      </div>
    );
  }

  const update = (field: keyof CheckoutForm, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateStep = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutForm, string>> = {};
    if (step === 'contact') {
      if (!form.firstName.trim()) newErrors.firstName = 'Requerido';
      if (!form.lastName.trim()) newErrors.lastName = 'Requerido';
      if (!validateEmail(form.email)) newErrors.email = 'Email inválido';
      if (!form.phone.trim()) newErrors.phone = 'Requerido';
    }
    if (step === 'shipping') {
      if (!form.address.trim()) newErrors.address = 'Requerido';
      if (!form.city.trim()) newErrors.city = 'Requerido';
      if (!form.province) newErrors.province = 'Requerido';
      if (!form.postalCode.trim()) newErrors.postalCode = 'Requerido';
    }
    if (step === 'payment') {
      if (!form.paymentMethod) newErrors.paymentMethod = 'Seleccioná un método de pago';
      if (form.paymentMethod === 'debito' || form.paymentMethod === 'credito') {
        if (form.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Número inválido';
        if (!form.cardName.trim()) newErrors.cardName = 'Requerido';
        if (!form.cardExpiry) newErrors.cardExpiry = 'Requerido';
        if (form.cardCvc.length < 3) newErrors.cardCvc = 'CVC inválido';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    if (step === 'contact') setStep('shipping');
    else if (step === 'shipping') setStep('payment');
    else {
      clearCart();
      navigate('/confirmacion', { state: { form, total: total + shipping, items } });
    }
  };

  const stepIndex = steps.findIndex(s => s.id === step);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <Link to="/">
            <Logo variant="dark" size="sm" showTagline />
          </Link>
          <div className="flex items-center gap-1">
            <Lock size={12} className="text-luxury-lightgray" />
            <span className="font-sans font-light text-[10px] text-luxury-lightgray tracking-wide">Pago seguro</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Steps */}
        <nav className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                    i <= stepIndex ? 'bg-gold text-luxury-black' : 'bg-gray-200 text-white'
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`font-sans font-light text-[10px] tracking-widest uppercase ${
                    i === stepIndex ? 'text-luxury-black' : 'text-luxury-lightgray'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <ChevronRight size={12} className="text-gray-300 flex-shrink-0" />
              )}
            </div>
          ))}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 bg-white p-6 md:p-8 border border-gray-100">
            {step === 'contact' && (
              <div className="space-y-5 animate-fade-in">
                <h2 className="font-serif text-xl text-luxury-black mb-6">Información de Contacto</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Nombre *" error={errors.firstName}>
                    <input className="input-field" value={form.firstName} onChange={e => update('firstName', e.target.value)} placeholder="Valentina" />
                  </Field>
                  <Field label="Apellido *" error={errors.lastName}>
                    <input className="input-field" value={form.lastName} onChange={e => update('lastName', e.target.value)} placeholder="Martínez" />
                  </Field>
                </div>
                <Field label="Email *" error={errors.email}>
                  <input type="email" className="input-field" value={form.email} onChange={e => update('email', e.target.value)} placeholder="tu@email.com" />
                </Field>
                <Field label="Teléfono *" error={errors.phone}>
                  <input type="tel" className="input-field" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+54 11 1234-5678" />
                </Field>
              </div>
            )}

            {step === 'shipping' && (
              <div className="space-y-5 animate-fade-in">
                <h2 className="font-serif text-xl text-luxury-black mb-6">Dirección de Envío</h2>
                <Field label="Dirección *" error={errors.address}>
                  <input className="input-field" value={form.address} onChange={e => update('address', e.target.value)} placeholder="Av. Corrientes 1234, Piso 3" />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Ciudad *" error={errors.city}>
                    <input className="input-field" value={form.city} onChange={e => update('city', e.target.value)} placeholder="Saavedra" />
                  </Field>
                  <Field label="Provincia *" error={errors.province}>
                    <select className="input-field" value={form.province} onChange={e => update('province', e.target.value)}>
                      <option value="">Seleccioná</option>
                      {['Buenos Aires', 'CABA', 'Córdoba', 'Santa Fe', 'Mendoza', 'Rosario', 'Tucumán'].map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label="Código Postal *" error={errors.postalCode}>
                  <input className="input-field max-w-xs" value={form.postalCode} onChange={e => update('postalCode', e.target.value)} placeholder="1414" />
                </Field>
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-serif text-xl text-luxury-black mb-6">Método de Pago</h2>

                {/* Payment method selector */}
                <div className="space-y-3">
                  {paymentOptions.map(opt => {
                    const Icon = opt.icon;
                    return (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-4 p-4 border cursor-pointer transition-all duration-200 ${
                          form.paymentMethod === opt.id
                            ? 'border-gold bg-gold/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={opt.id}
                          checked={form.paymentMethod === opt.id}
                          onChange={() => update('paymentMethod', opt.id)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          form.paymentMethod === opt.id ? 'border-gold' : 'border-gray-300'
                        }`}>
                          {form.paymentMethod === opt.id && (
                            <div className="w-2 h-2 rounded-full bg-gold" />
                          )}
                        </div>
                        <Icon size={18} strokeWidth={1.5} className={form.paymentMethod === opt.id ? 'text-gold' : 'text-luxury-lightgray'} />
                        <div>
                          <p className="font-sans font-light text-xs text-luxury-black">{opt.label}</p>
                          <p className="font-sans font-light text-[10px] text-luxury-lightgray">{opt.desc}</p>
                        </div>
                      </label>
                    );
                  })}
                  {errors.paymentMethod && (
                    <p className="font-sans font-light text-[10px] text-red-500">{errors.paymentMethod}</p>
                  )}
                </div>

                {/* Card fields */}
                {(form.paymentMethod === 'debito' || form.paymentMethod === 'credito') && (
                  <div className="space-y-5 pt-4 border-t border-gray-100">
                    <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">
                      Datos de la tarjeta — procesado por Mercado Pago
                    </p>
                    <Field label="Número de tarjeta" error={errors.cardNumber}>
                      <input
                        className="input-field"
                        value={form.cardNumber}
                        onChange={e => {
                          const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
                          const formatted = raw.replace(/(.{4})/g, '$1 ').trim();
                          update('cardNumber', formatted);
                        }}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                      />
                    </Field>
                    <Field label="Nombre en la tarjeta" error={errors.cardName}>
                      <input className="input-field" value={form.cardName} onChange={e => update('cardName', e.target.value.toUpperCase())} placeholder="VALENTINA MARTÍNEZ" />
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Vencimiento" error={errors.cardExpiry}>
                        <input
                          className="input-field"
                          value={form.cardExpiry}
                          onChange={e => {
                            const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
                            const formatted = raw.length >= 3 ? raw.slice(0, 2) + '/' + raw.slice(2) : raw;
                            update('cardExpiry', formatted);
                          }}
                          placeholder="MM/AA"
                          maxLength={5}
                        />
                      </Field>
                      <Field label="CVC" error={errors.cardCvc}>
                        <input
                          className="input-field"
                          value={form.cardCvc}
                          onChange={e => update('cardCvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="123"
                          maxLength={4}
                        />
                      </Field>
                    </div>
                  </div>
                )}

                {/* Bank transfer info */}
                {form.paymentMethod === 'transferencia' && (
                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray mb-3">
                      Datos bancarios
                    </p>
                    <div className="bg-cream p-4 space-y-2">
                      <Row label="Banco" value="Banco Galicia" />
                      <Row label="Titular" value="ÉLIXIR PARFUMERIE S.A." />
                      <Row label="CBU" value="0070123530000000100012" />
                      <Row label="Alias" value="ELIXIR.PARFUMERIE" />
                      <Row label="CUIT" value="30-71234567-8" />
                    </div>
                    <p className="font-sans font-light text-[10px] text-luxury-lightgray leading-relaxed">
                      Una vez realizada la transferencia, enviá el comprobante a <span className="text-luxury-black">pagos@elixirparfum.com</span>. Tu pedido se procesará dentro de las 24 hs hábiles.
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-2">
                  <Lock size={12} className="text-luxury-lightgray" />
                  <p className="font-sans font-light text-[10px] text-luxury-lightgray">
                    Tus datos están protegidos con encriptación SSL de 256 bits.
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              {stepIndex > 0 ? (
                <button
                  onClick={() => setStep(steps[stepIndex - 1].id)}
                  className="btn-secondary text-xs px-6"
                >
                  Atrás
                </button>
              ) : (
                <Link to="/carrito" className="btn-secondary text-xs px-6">Volver al carrito</Link>
              )}
              <button onClick={nextStep} className="btn-primary text-xs px-8">
                {step === 'payment' ? 'Confirmar Compra' : 'Continuar'}
              </button>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-100 p-6 sticky top-24">
              <h3 className="font-serif text-base text-luxury-black mb-5 pb-4 border-b border-gray-100">
                Tu Pedido
              </h3>
              <ul className="space-y-4 mb-5">
                {items.map(item => (
                  <li key={`${item.product.id}-${item.selectedSize.ml}`} className="flex gap-3">
                    <div className="relative flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover" />
                      <span className="absolute -top-1.5 -right-1.5 bg-luxury-lightgray text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-xs text-luxury-black leading-tight">{item.product.name}</p>
                      <p className="font-sans font-light text-[10px] text-luxury-lightgray">{item.selectedSize.ml} ml</p>
                    </div>
                    <p className="font-sans font-light text-xs text-luxury-charcoal">
                      {formatPrice(item.selectedSize.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="font-sans font-light text-xs text-luxury-gray">Subtotal</span>
                  <span className="font-sans font-light text-xs text-luxury-charcoal">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans font-light text-xs text-luxury-gray">Envío</span>
                  <span className={`font-sans font-light text-xs ${shipping === 0 ? 'text-green-600' : 'text-luxury-charcoal'}`}>
                    {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-100">
                  <span className="font-sans font-light text-xs tracking-widest uppercase text-luxury-lightgray">Total</span>
                  <span className="font-serif text-lg text-luxury-black">{formatPrice(total + shipping)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray mb-2">
        {label}
      </label>
      {children}
      {error && <p className="font-sans font-light text-[10px] text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="font-sans font-light text-[10px] text-luxury-lightgray">{label}</span>
      <span className="font-sans font-light text-[10px] text-luxury-black tracking-wider select-all">{value}</span>
    </div>
  );
}
