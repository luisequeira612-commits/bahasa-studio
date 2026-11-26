/**
 * Shared structural types for Guardi's existing multi-language runtime.
 * These describe current compatibility shapes; they do not define new runtime data.
 */
type GuardiLanguageCode = 'pt-BR' | 'en' | 'it' | 'fr' | 'de' | 'nl' | 'ru' | 'ja' | 'ko' | 'id';
type GuardiCefrLevel = 'A1' | 'A2' | 'B1' | 'B2';
type GuardiVoiceStatus = 'configured' | 'candidate' | 'unverified';

interface GuardiValidationResult {
    readonly valid: boolean;
    readonly errors: readonly string[];
}

interface GuardiLanguageConfig {
    readonly code: GuardiLanguageCode;
    readonly locale: string;
    readonly name: string;
    readonly flag: string;
    readonly piperVoice: string;
    readonly voiceStatus: GuardiVoiceStatus;
    readonly audioPath: string;
    readonly curriculum: Readonly<Partial<Record<GuardiCefrLevel, string>>>;
    readonly testPhrase?: string;
    readonly available: boolean;
}

interface GuardiLanguageManagerOptions {
    read?: () => unknown | Promise<unknown>;
    write?: (code: GuardiLanguageCode) => void | Promise<void>;
    onChange?: (code: GuardiLanguageCode) => void;
}

interface GuardiLanguageManagerApi {
    readonly STORAGE_KEY: string;
    readonly LANGUAGES: Readonly<Record<GuardiLanguageCode, GuardiLanguageConfig>>;
    init(options?: GuardiLanguageManagerOptions | null): Promise<GuardiLanguageCode>;
    setActiveLanguage(code: string, options?: { persist?: boolean }): Promise<GuardiLanguageCode>;
    getActiveLanguage(): GuardiLanguageCode;
    getLanguage(code: string): GuardiLanguageConfig | null;
    getLocale(code: string): string | null;
    isSupported(code: string): boolean;
    isAvailable(code: string): boolean;
    list(): readonly GuardiLanguageConfig[];
    validateLanguageConfig(value: unknown): GuardiValidationResult;
    validateLanguageCatalog(entries: unknown): GuardiValidationResult;
}

interface GuardiCurriculumDescriptor {
    readonly language: string;
    readonly level: GuardiCefrLevel;
    readonly path: string;
    readonly exportName: string | null;
}

interface GuardiContentDescriptor {
    readonly language: string;
    readonly level: GuardiCefrLevel;
    readonly path: string;
}

interface GuardiCurriculumBlockDescriptor {
    readonly id: string;
    readonly path: string;
    readonly units: readonly number[];
}

interface GuardiCurriculumManifest {
    readonly id?: string;
    readonly language?: string;
    readonly title: string;
    readonly totalUnits: number;
    readonly publishedUnits: readonly number[];
    readonly blocks: readonly GuardiCurriculumBlockDescriptor[];
}

interface GuardiCurriculumUnit {
    readonly unitNumber?: number;
    readonly [key: string]: unknown;
}

interface GuardiCurriculum {
    readonly id?: string;
    readonly title?: string;
    readonly language?: string;
    readonly totalUnits?: number;
    readonly units?: readonly GuardiCurriculumUnit[];
    readonly [key: string]: unknown;
}

interface GuardiCurriculumBlock {
    readonly units: readonly GuardiCurriculumUnit[];
}

interface GuardiAdaptedVocabulary {
    readonly id: string | null;
    readonly text: string | null;
    readonly translation: string | null;
    readonly example: string | null;
    readonly exampleTranslation: string | null;
    readonly [key: string]: unknown;
}

interface GuardiMatchingPair {
    readonly target: string;
    readonly translation: string;
}

declare var LanguageManager: GuardiLanguageManagerApi;
declare var GUARDI_CURRICULA: Record<string, Partial<Record<GuardiCefrLevel, GuardiCurriculum>>> | undefined;
declare var GUARDI_CURRICULUM_MANIFESTS: Record<string, Partial<Record<GuardiCefrLevel, GuardiCurriculumManifest>>> | undefined;
declare var GUARDI_CURRICULUM_BLOCKS: Record<string, Partial<Record<GuardiCefrLevel, Record<string, GuardiCurriculumBlock>>>> | undefined;

interface Window {
    LanguageManager: GuardiLanguageManagerApi;
    GUARDI_CURRICULA?: Record<string, Partial<Record<GuardiCefrLevel, GuardiCurriculum>>>;
    GUARDI_CURRICULUM_MANIFESTS?: Record<string, Partial<Record<GuardiCefrLevel, GuardiCurriculumManifest>>>;
    GUARDI_CURRICULUM_BLOCKS?: Record<string, Partial<Record<GuardiCefrLevel, Record<string, GuardiCurriculumBlock>>>>;
}

interface GuardiProgressNamespaceApi {
    readonly supportedLanguages: readonly GuardiLanguageCode[];
    readonly progressSettings: readonly string[];
    storageKey(store: string, key: unknown, language?: string): string;
    belongsToLanguage(store: string, key: unknown, language?: string): boolean;
    logicalKey(store: string, key: unknown, language?: string): string;
    filterRecords(store: string, records: unknown, language?: string): unknown[];
}

interface Window {
    ProgressNamespace: GuardiProgressNamespaceApi;
}
