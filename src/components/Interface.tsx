import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Sparkles,
    Target,
    User,
    Database,
    Shield,
    Users,
    MessageSquare,
    FileOutput,
    ArrowRight,
    ArrowLeft,
    Brain,
    BookOpen,
    Fingerprint,
    Rocket,
    Check,
    Edit3,
    Mail
} from 'lucide-react'
import { useVektorStore, FormData } from '../store/useVektorStore'

// Step configuration
const steps = [
    {
        id: 'contact',
        field: 'nome' as keyof FormData, // Dummy field for type safety, we'll handle both manually
        question: 'Vamos começar pelo básico',
        helper: 'Primeiro, precisamos saber quem é você.',
        icon: User,
        type: 'contact' as const,
    },
    {
        id: 'nome_agente',
        field: 'nome_agente' as keyof FormData,
        question: 'Qual o nome do Agente?',
        helper: 'Nome ou apelido (Ex: Ronaldinho, Jarvis, Atendente Virtual...)',
        icon: Sparkles,
        type: 'input' as const,
    },
    {
        id: 'objetivo',
        field: 'objetivo' as keyof FormData,
        question: 'O que você quer que esse agente faça?',
        helper: 'Ex: Quero que ele tire dúvidas dos meus vendedores sobre o manual de vendas...',
        icon: Target,
        type: 'textarea' as const,
    },
    {
        id: 'personalidade',
        field: 'personalidade' as keyof FormData,
        question: 'Qual é a personalidade dele?',
        helper: 'Se fosse uma pessoa, quem seria? Ex: Técnico linha dura, Professor paciente, Steve Jobs...',
        icon: User,
        type: 'input' as const,
    },
    {
        id: 'base_conhecimento',
        field: 'base_conhecimento' as keyof FormData,
        question: 'No que ele deve se basear para responder?',
        helper: 'Quais PDFs ou autores? Ex: Meu E-book X e leis de trânsito, ou Filosofia do Bernardinho...',
        icon: Database,
        type: 'textarea' as const,
    },
    {
        id: 'restricoes',
        field: 'restricoes' as keyof FormData,
        question: 'O que ele NÃO pode fazer de jeito nenhum?',
        helper: 'Ex: Não inventar preços, não ser mal educado, não falar de política.',
        icon: Shield,
        type: 'input' as const,
    },
    {
        id: 'usuarios',
        field: 'usuarios' as keyof FormData,
        question: 'Quem vai conversar com ele?',
        helper: 'Ex: Clientes leigos, Funcionários sêniores, Apenas eu.',
        icon: Users,
        type: 'input' as const,
    },
    {
        id: 'perguntas_comuns',
        field: 'perguntas_comuns' as keyof FormData,
        question: 'Quais são as perguntas mais comuns que farão para ele?',
        helper: 'Para criar os botões de atalho. Ex: Como faço tal coisa?',
        icon: MessageSquare,
        type: 'textarea' as const,
    },
    {
        id: 'formato_resposta',
        field: 'formato_resposta' as keyof FormData,
        question: 'Como deve ser o formato da resposta?',
        helper: 'Ex: Curtas e diretas, Longas e explicativas, Pode usar emojis...',
        icon: FileOutput,
        type: 'input' as const,
    },
]

// Educational cards data - The 3 Pillars
const pillars = [
    {
        icon: BookOpen,
        title: 'O Cérebro',
        description: 'Seus manuais e PDFs.',
    },
    {
        icon: Fingerprint,
        title: 'A Personalidade',
        description: 'Seu tom de voz e regras.',
    },
    {
        icon: Rocket,
        title: 'A Missão',
        description: 'O problema específico a resolver.',
    },
]

// Hero Section Component with Glass Container
function HeroSection() {
    const { setUIMode, triggerPulse } = useVektorStore()

    const handleStartBriefing = () => {
        triggerPulse()
        setUIMode('wizard')
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full"
        >
            {/* Glass Container */}
            <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 md:p-10">

                {/* A. The Hook (Hero) */}
                <div className="text-center mb-8">
                    {/* Header Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-oi-primary/10 border border-oi-primary/20 mb-6"
                    >
                        <Brain className="w-4 h-4 text-oi-primary" />
                        <span className="text-xs text-oi-primary font-medium">OI Digital Media</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4 leading-tight"
                    >
                        Clone sua melhor versão
                    </motion.h1>

                    {/* Subhead */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto"
                    >
                        Transforme seu conhecimento em um Agente Inteligente que trabalha 24/7.
                    </motion.p>
                </div>

                {/* B. The Educational Metaphor */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-zinc-800/50 rounded-xl p-5 my-6 border border-zinc-700/50"
                >
                    <h2 className="text-base font-medium text-white mb-2">
                        Imagine o funcionário perfeito...
                    </h2>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        O ChatGPT normal é como um estagiário que "sabe de tudo um pouco", mas não conhece sua empresa.
                        O <span className="text-oi-primary font-medium">Agente Personalizado</span> é diferente —
                        é um especialista treinado por você, que segue suas regras.
                    </p>
                </motion.div>

                {/* C. The 3 Pillars */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8"
                >
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-5 text-center"
                        >
                            <div className="p-2.5 rounded-lg bg-oi-primary/10 border border-oi-primary/20 w-fit mx-auto mb-3">
                                <pillar.icon className="w-5 h-5 text-oi-primary" />
                            </div>
                            <h3 className="text-sm font-medium text-white mb-1">{pillar.title}</h3>
                            <p className="text-xs text-zinc-500">{pillar.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* D. The CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center"
                >
                    <button
                        onClick={handleStartBriefing}
                        className="btn-primary text-sm px-8 py-3 inline-flex items-center gap-2"
                    >
                        Começar Briefing
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </motion.div>
            </div>
        </motion.div>
    )
}

// Review Section Component
function ReviewSection() {
    const { formData, setUIMode, updateField } = useVektorStore()
    const [editId, setEditId] = useState<string | null>(null)

    const handleEdit = (id: string) => {
        setEditId(id)
    }

    const handleSave = () => {
        setEditId(null)
    }

    const handleSubmit = async () => {
        try {
            // Trigger 3D pulse effect
            // triggerPulse() // Optional: if we want visual feedback immediately

            console.log('Enviando briefing:', formData)

            const response = await fetch('https://criadordigital-n8n-webhook.bbw7sv.easypanel.host/webhook/forms-briefing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                console.error('Erro ao enviar:', response.statusText)
                // Fallback or alert could go here, but for now we proceed or log
            }

            // Success state
            setUIMode('submitted')

        } catch (error) {
            console.error('Erro na requisição:', error)
            // Even if it fails, maybe showing the submitted screen is safer for UI flow 
            // unless we want to block. For a briefing tool, maybe better to show "Submitted" 
            // but ideally we'd show an error. 
            // For now, let's assume success to not block the user, or show alert.
            alert('Houve um erro ao enviar o formulário. Por favor, tente novamente.')
        }
    }

    const handleBack = () => {
        setUIMode('wizard')
        // We stay on the last step (Review usually comes after the last step)
        // or we could go to the very last step explicitly:
        // goToStep(steps.length - 1)
    }

    // Filter out the contact step field from the generic mapping if needed, 
    // but we can just show Name and Email at the top specifically.
    const otherSteps = steps.filter(s => s.id !== 'contact')

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full"
        >
            <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 md:p-10 min-h-[500px] flex flex-col justify-between">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-oi-primary/10 border border-oi-primary/20">
                        <Check className="w-5 h-5 text-oi-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-white">Revise seu briefing</h2>
                        <p className="text-xs text-zinc-500">Clique em qualquer campo para editar</p>
                    </div>
                </div>

                {/* Review Items */}
                <div className="space-y-3 mb-6 pr-2">
                    {/* Manual Contact Details */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Name Field */}
                        <div className={`text-left p-4 bg-zinc-800/30 border border-zinc-700/50 rounded-xl transition-all group ${editId === 'nome' ? 'border-oi-primary/50 bg-zinc-800/50' : 'hover:border-oi-primary/30 hover:bg-zinc-800/50'}`}>
                            <div className="flex justify-between items-start mb-1">
                                <p className="text-xs text-zinc-500">Seu Nome</p>
                                {editId === 'nome' ? (
                                    <button onClick={handleSave} className="text-oi-primary hover:scale-110 transition-transform"><Check className="w-3 h-3" /></button>
                                ) : (
                                    <button onClick={() => handleEdit('nome')} className="text-zinc-600 hover:text-oi-primary transition-colors"><Edit3 className="w-3 h-3" /></button>
                                )}
                            </div>
                            {editId === 'nome' ? (
                                <input
                                    autoFocus
                                    className="w-full bg-transparent text-sm text-white focus:outline-none border-b border-oi-primary/30 pb-1"
                                    value={formData.nome}
                                    onChange={(e) => updateField('nome', e.target.value)}
                                    placeholder="Seu nome..."
                                />
                            ) : (
                                <p className="text-sm text-white truncate">{formData.nome || '...'}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className={`text-left p-4 bg-zinc-800/30 border border-zinc-700/50 rounded-xl transition-all group ${editId === 'email' ? 'border-oi-primary/50 bg-zinc-800/50' : 'hover:border-oi-primary/30 hover:bg-zinc-800/50'}`}>
                            <div className="flex justify-between items-start mb-1">
                                <p className="text-xs text-zinc-500">Seu Email</p>
                                {editId === 'email' ? (
                                    <button onClick={handleSave} className="text-oi-primary hover:scale-110 transition-transform"><Check className="w-3 h-3" /></button>
                                ) : (
                                    <button onClick={() => handleEdit('email')} className="text-zinc-600 hover:text-oi-primary transition-colors"><Edit3 className="w-3 h-3" /></button>
                                )}
                            </div>
                            {editId === 'email' ? (
                                <input
                                    className="w-full bg-transparent text-sm text-white focus:outline-none border-b border-oi-primary/30 pb-1"
                                    value={formData.email}
                                    onChange={(e) => updateField('email', e.target.value)}
                                    placeholder="Seu email..."
                                />
                            ) : (
                                <p className="text-sm text-white truncate">{formData.email || '...'}</p>
                            )}
                        </div>
                    </div>

                    {otherSteps.map((step) => (
                        <div
                            key={step.id}
                            className={`w-full text-left p-4 bg-zinc-800/30 border border-zinc-700/50 rounded-xl transition-all group ${editId === step.id ? 'border-oi-primary/50 bg-zinc-800/50' : 'hover:border-oi-primary/30 hover:bg-zinc-800/50'}`}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3 flex-1 min-w-0">
                                    <step.icon className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-zinc-500 mb-1">{step.question}</p>

                                        {editId === step.id ? (
                                            step.type === 'textarea' || step.id === 'perguntas_comuns' || step.id === 'base_conhecimento' ? (
                                                <textarea
                                                    autoFocus
                                                    rows={3}
                                                    className="w-full bg-transparent text-sm text-white focus:outline-none border border-oi-primary/30 rounded p-2 mt-1"
                                                    value={formData[step.field]}
                                                    onChange={(e) => updateField(step.field, e.target.value)}
                                                />
                                            ) : (
                                                <input
                                                    autoFocus
                                                    className="w-full bg-transparent text-sm text-white focus:outline-none border-b border-oi-primary/30 pb-1 mt-1"
                                                    value={formData[step.field]}
                                                    onChange={(e) => updateField(step.field, e.target.value)}
                                                />
                                            )
                                        ) : (
                                            <p className="text-sm text-white truncate">
                                                {formData[step.field] || <span className="text-zinc-600 italic">Não preenchido</span>}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {editId === step.id ? (
                                    <button onClick={handleSave} className="text-oi-primary hover:scale-110 transition-transform p-1">
                                        <Check className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(step.id)} className="text-zinc-600 group-hover:text-oi-primary transition-colors p-1">
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
                    <button onClick={handleBack} className="btn-ghost text-sm flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Voltar
                    </button>
                    <button onClick={handleSubmit} className="btn-primary text-sm flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Enviar Briefing
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

// Wizard Form Component
function WizardForm() {
    const { currentStep, totalSteps, nextStep, prevStep, formData, updateField, setUIMode } = useVektorStore()

    const step = steps[currentStep]
    const progress = ((currentStep + 1) / totalSteps) * 100
    const isLastStep = currentStep === totalSteps - 1

    const handleBack = () => {
        if (currentStep === 0) {
            setUIMode('hero')
        } else {
            prevStep()
        }
    }

    // Validation Logic
    const isValid = () => {
        if (step.type === 'contact') {
            return formData.nome?.trim().length > 0 && formData.email?.trim().length > 0
        }
        return formData[step.field]?.trim().length > 0
    }

    const handleNext = () => {
        if (!isValid()) return // Stop validation

        if (isLastStep) {
            setUIMode('review')
        } else {
            nextStep()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleNext()
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full"
        >
            {/* Glass Container for Wizard - Fixed Height */}
            <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 md:p-10 min-h-[500px] flex flex-col justify-between">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-oi-primary/10 border border-oi-primary/20">
                            <Brain className="w-4 h-4 text-oi-primary" />
                        </div>
                        <span className="text-zinc-500 text-xs font-medium">
                            {currentStep + 1} / {totalSteps}
                        </span>
                    </div>
                    <span className="text-xs text-oi-primary">
                        {Math.round(progress)}%
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden mb-8">
                    <motion.div
                        className="h-full bg-oi-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                </div>

                {/* Step Content - Fixed height */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="min-h-[280px] flex flex-col"
                    >
                        {/* Question Header */}
                        <div className="flex items-start gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-oi-primary/10 border border-oi-primary/20 shrink-0">
                                <step.icon className="w-5 h-5 text-oi-primary" />
                            </div>
                            <div>
                                <h2 className="text-lg font-medium text-white mb-1">
                                    {step.question}
                                </h2>
                                <p className="text-zinc-500 text-sm">
                                    {step.helper}
                                </p>
                            </div>
                        </div>

                        {/* Input Fields - flex-1 to fill space */}
                        <div className="flex-1 flex flex-col justify-center gap-4">
                            {step.type === 'contact' && (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-xs text-zinc-500 ml-1">Seu Nome</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                            <input
                                                type="text"
                                                value={formData.nome}
                                                onChange={(e) => updateField('nome', e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                placeholder="Como você se chama?"
                                                className="w-full glass-input pl-10"
                                                autoFocus
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-zinc-500 ml-1">Seu E-mail</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => updateField('email', e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                placeholder="exemplo@email.com"
                                                className="w-full glass-input pl-10"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {(step.type === 'input' || step.type === 'textarea') && (
                                <textarea
                                    value={formData[step.field]}
                                    onChange={(e) => updateField(step.field, e.target.value)}
                                    // Make sure we pass the event correctly
                                    onKeyDown={handleKeyDown}
                                    placeholder={step.helper}
                                    rows={5}
                                    className="w-full glass-input resize-none"
                                    autoFocus
                                />
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
                    <button onClick={handleBack} className="btn-ghost text-sm flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Voltar
                    </button>
                    <button
                        onClick={handleNext}
                        className={`btn-primary text-sm flex items-center gap-2 ${!isValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!isValid()}
                    >
                        {isLastStep ? 'Revisar' : 'Continuar'}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

// Submitted Success View
function SubmittedView() {
    const { resetForm } = useVektorStore()

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl mx-auto px-4"
        >
            <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 md:p-10 min-h-[500px] flex flex-col items-center justify-center text-center">

                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                    className="p-4 rounded-full bg-green-500/10 border border-green-500/20 mb-6"
                >
                    <Check className="w-12 h-12 text-green-500" />
                </motion.div>

                <h2 className="text-3xl font-bold text-white mb-4">Briefing Recebido!</h2>

                <p className="text-zinc-400 max-w-md mx-auto mb-8 leading-relaxed">
                    Os dados do seu Agente foram enviados para nossa equipe.
                    Vamos analisar e iniciar a criação do seu melhor Agente.
                </p>

                <button
                    onClick={() => resetForm()}
                    className="btn-ghost text-sm"
                >
                    Voltar ao Início
                </button>
            </div>
        </motion.div>
    )
}

// Main Interface Component
export function Interface() {
    const uiMode = useVektorStore((state) => state.uiMode)

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none z-10 overflow-y-auto">
            <div className="pointer-events-auto my-auto py-8 w-full max-w-3xl">
                <AnimatePresence mode="wait">
                    {uiMode === 'hero' && <HeroSection key="hero" />}
                    {uiMode === 'wizard' && <WizardForm key="wizard" />}
                    {uiMode === 'review' && <ReviewSection key="review" />}
                    {uiMode === 'submitted' && <SubmittedView key="submitted" />}
                </AnimatePresence>
            </div>
        </div>
    )
}
