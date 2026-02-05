import { create } from 'zustand'

export interface FormData {
    nome: string
    email: string
    nome_agente: string
    objetivo: string
    personalidade: string
    base_conhecimento: string
    restricoes: string
    usuarios: string
    perguntas_comuns: string
    formato_resposta: string
}

type UIMode = 'hero' | 'wizard' | 'review' | 'submitted'

interface VektorState {
    // UI Mode
    uiMode: UIMode
    setUIMode: (mode: UIMode) => void

    // Loading state for 3D
    isLoading: boolean
    setLoading: (loading: boolean) => void

    // Form navigation
    currentStep: number
    totalSteps: number
    nextStep: () => void
    prevStep: () => void
    goToStep: (step: number) => void

    // Form data
    formData: FormData
    updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void

    // Reactive state for 3D animation
    pulseIntensity: number
    triggerPulse: () => void

    // Reset form
    resetForm: () => void
}

export const useVektorStore = create<VektorState>((set, get) => ({
    // UI Mode
    uiMode: 'hero',
    setUIMode: (mode) => set({ uiMode: mode }),

    // Loading
    isLoading: true,
    setLoading: (loading) => set({ isLoading: loading }),

    // Navigation
    currentStep: 0,
    totalSteps: 9,
    nextStep: () => {
        const { currentStep, totalSteps, triggerPulse } = get()
        if (currentStep < totalSteps - 1) {
            set({ currentStep: currentStep + 1 })
            triggerPulse()
        }
    },
    prevStep: () => {
        const { currentStep } = get()
        if (currentStep > 0) {
            set({ currentStep: currentStep - 1 })
        }
    },
    goToStep: (step) => set({ currentStep: step }),

    // Form data - 8 specific fields in Portuguese
    formData: {
        nome: '',
        email: '',
        nome_agente: '',
        objetivo: '',
        personalidade: '',
        base_conhecimento: '',
        restricoes: '',
        usuarios: '',
        perguntas_comuns: '',
        formato_resposta: '',
    },
    updateField: (field, value) =>
        set((state) => ({
            formData: { ...state.formData, [field]: value },
        })),

    // Reset Form
    resetForm: () => set({
        currentStep: 0,
        uiMode: 'hero',
        formData: {
            nome: '',
            email: '',
            nome_agente: '',
            objetivo: '',
            personalidade: '',
            base_conhecimento: '',
            restricoes: '',
            usuarios: '',
            perguntas_comuns: '',
            formato_resposta: '',
        }
    }),

    // Reactive 3D state
    pulseIntensity: 0,
    triggerPulse: () => {
        set({ pulseIntensity: 1 })
        // Decay the pulse
        setTimeout(() => set({ pulseIntensity: 0.5 }), 200)
        setTimeout(() => set({ pulseIntensity: 0 }), 600)
    },
}))
