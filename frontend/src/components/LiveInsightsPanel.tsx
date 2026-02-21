'use client';

import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { AlertTriangle, ArrowRight, Activity, Shield, TrendingUp, ChevronRight } from 'lucide-react';

const triageColors = {
    emergency: { bg: '#FEE2E2', color: '#DC2626', border: '#EF4444' },
    urgent: { bg: '#FEF3C7', color: '#D97706', border: '#F59E0B' },
    primary: { bg: '#DBEAFE', color: '#2563EB', border: '#3B82F6' },
    'self-care': { bg: '#DCFCE7', color: '#16A34A', border: '#22C55E' },
};

const riskColors = {
    low: { bg: '#DCFCE7', color: '#166534' },
    medium: { bg: '#FEF3C7', color: '#92400E' },
    high: { bg: '#FEE2E2', color: '#991B1B' },
};

const getCauseImage = (causeName: string, triageLevel: string) => {
    const name = causeName.toLowerCase();

    // Specific condition mappings
    if (name.includes('heart') || name.includes('cardio') || name.includes('coronary') || name.includes('infarction')) return 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'; // Cardiology
    if (name.includes('skin') || name.includes('rash') || name.includes('dermatitis') || name.includes('melanoma')) return 'https://images.unsplash.com/photo-1607613009820-a29f4fd99f46?auto=format&fit=crop&w=400&q=80'; // Dermatology
    if (name.includes('lung') || name.includes('respiratory') || name.includes('asthma') || name.includes('breath') || name.includes('pulmonary') || name.includes('pneumonia')) return 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?auto=format&fit=crop&w=400&q=80'; // Respiratory
    if (name.includes('aqi') || name.includes('air pollution') || name.includes('smog')) return 'https://images.unsplash.com/photo-1473161922904-42fcd6da8a16?auto=format&fit=crop&w=400&q=80'; // AQI / Air Pollution
    if (name.includes('brain') || name.includes('migraine') || name.includes('headache') || name.includes('neuro') || name.includes('stroke')) return 'https://images.unsplash.com/photo-1616012480717-fd9867059ca0?auto=format&fit=crop&w=400&q=80'; // Neurological
    if (name.includes('stomach') || name.includes('gerd') || name.includes('digest') || name.includes('abdomen') || name.includes('ulcer')) return 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80'; // Digestive
    if (name.includes('fever') || name.includes('infection') || name.includes('flu') || name.includes('virus')) return 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=400&q=80'; // Infection/Fever
    if (name.includes('muscle') || name.includes('bone') || name.includes('joint') || name.includes('arthritis') || name.includes('fracture')) return 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80'; // Orthopedic
    if (name.includes('nutrition') || name.includes('vitamin') || name.includes('deficiency') || name.includes('macro')) return 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80'; // Nutrition Macros
    if (name.includes('anxiety') || name.includes('stress') || name.includes('depression') || name.includes('panic')) return 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80'; // Mental

    // Triage-based fallbacks (data-driven tone)
    if (triageLevel === 'emergency') return 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=400&q=80'; // Urgent hospital setting, NOT low risk
    if (triageLevel === 'urgent') return 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=400&q=80'; // Clinical assessment
    if (triageLevel === 'primary') return 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80'; // Standard doctor consultation
    return 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80'; // Self-care, calm health visual
};

export default function LiveInsightsPanel() {
    const { t } = useTranslation();
    const { insights, emergencyActive } = useAppStore();
    const tc = triageColors[insights.triageLevel];

    // Get dynamic image based on top cause or fallback to triage level
    const topCause = insights.causes.length > 0 ? insights.causes[0].name : '';
    const dynamicImage = getCauseImage(topCause, insights.triageLevel);

    return (
        <div style={{
            width: 320, borderLeft: '1px solid #F1F5F9',
            background: '#FAFBFC', overflowY: 'auto',
            padding: '20px 16px', flexShrink: 0,
            display: 'flex', flexDirection: 'column', gap: 16,
        }}>
            {/* Emergency Banner */}
            {insights.triageLevel === 'emergency' && (
                <div className="animate-glow" style={{
                    background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                    borderRadius: 16, padding: 20, color: 'white',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <AlertTriangle size={20} />
                        <span style={{ fontWeight: 700, fontSize: 15 }}>{t('insights.emergency')}</span>
                    </div>
                    <p style={{ fontSize: 13, opacity: 0.9 }}>Seek immediate medical attention</p>
                </div>
            )}

            {/* AI Visual Context (Dynamic) */}
            {insights.causes.length > 0 && (
                <div style={{
                    width: '100%', height: 140, borderRadius: 16, overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)', position: 'relative',
                }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)', zIndex: 1 }} />
                    <img
                        src={dynamicImage}
                        alt={topCause || 'Medical Visual'}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', bottom: 12, left: 14, zIndex: 2, color: 'white' }}>
                        <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.9, marginBottom: 2 }}>Contextual Match</div>
                        <div style={{ fontSize: 15, fontWeight: 700 }}>{topCause}</div>
                    </div>
                </div>
            )}

            {/* Possible Causes */}
            <div className="card" style={{ padding: 16 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#64748B', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <TrendingUp size={15} />
                    {t('insights.possibleCauses')}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {insights.causes.map((cause, i) => {
                        const rc = riskColors[cause.risk];
                        return (
                            <div key={i} style={{
                                padding: 12, borderRadius: 12,
                                border: `1px solid ${rc.bg}`,
                                background: `${rc.bg}33`,
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                    <span style={{ fontWeight: 600, fontSize: 13 }}>{cause.name}</span>
                                    <span className="badge" style={{
                                        background: rc.bg, color: rc.color, fontSize: 11,
                                    }}>
                                        {cause.risk.toUpperCase()}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748B' }}>
                                    <span>Probability: {cause.probability}%</span>
                                    <span>Confidence: {cause.confidence}%</span>
                                </div>
                                <div className="progress-bar" style={{ marginTop: 8 }}>
                                    <div className="progress-fill" style={{ width: `${cause.probability}%` }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Triage Level */}
            <div className="card" style={{
                padding: 16,
                borderLeft: `4px solid ${tc.border}`,
            }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#64748B', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Shield size={15} />
                    {t('insights.triageLevel')}
                </h3>
                <div style={{
                    padding: '14px 16px', borderRadius: 12,
                    background: tc.bg, color: tc.color,
                    fontWeight: 700, fontSize: 15, textAlign: 'center',
                    textTransform: 'capitalize',
                }}>
                    {insights.triageLevel === 'self-care' ? t('insights.selfCare') :
                        insights.triageLevel === 'primary' ? t('insights.primaryCare') :
                            t(`insights.${insights.triageLevel}`)}
                </div>
            </div>

            {/* Red Flags */}
            {insights.redFlags.length > 0 && (
                <div className="card" style={{ padding: 16 }}>
                    <h3 style={{ fontSize: 13, fontWeight: 600, color: '#EF4444', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <AlertTriangle size={15} />
                        {t('insights.redFlags')}
                    </h3>
                    {insights.redFlags.map((flag, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '8px 12px', borderRadius: 8,
                            background: '#FEF2F2', marginBottom: 6,
                            fontSize: 13, color: '#991B1B',
                        }}>
                            <span>⚠️</span> {flag}
                        </div>
                    ))}
                </div>
            )}

            {/* Next Steps */}
            <div className="card" style={{ padding: 16 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#64748B', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ArrowRight size={15} />
                    {t('insights.nextSteps')}
                </h3>
                {insights.nextSteps.map((step, i) => (
                    <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '8px 0', fontSize: 13, color: '#475569',
                        borderBottom: i < insights.nextSteps.length - 1 ? '1px solid #F1F5F9' : 'none',
                    }}>
                        <ChevronRight size={14} color="#0EA5A4" />
                        {step}
                    </div>
                ))}
            </div>

            {/* AI Confidence */}
            <div className="card" style={{ padding: 16 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#64748B', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Activity size={15} />
                    {t('insights.aiConfidence')}
                </h3>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        fontSize: 32, fontWeight: 700,
                        background: 'linear-gradient(135deg, #0EA5A4, #6366F1)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: 8,
                    }}>
                        {insights.aiConfidence}%
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${insights.aiConfidence}%` }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
