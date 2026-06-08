declare var __VLS_1: {
    loading: true;
}, __VLS_8: {};
type __VLS_Slots = {} & {
    loading?: (props: typeof __VLS_1) => any;
} & {
    error?: (props: typeof __VLS_8) => any;
};
declare const __VLS_base: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    locale: {
        type: StringConstructor;
        default(): string;
    };
    license: {
        type: StringConstructor;
        default: string;
    };
    value: {
        type: ObjectConstructor;
        default: () => {
            id: string;
            documentStyle: {
                pageSize: {
                    width: number;
                    height: number;
                };
                documentFlavor: number;
                marginTop: number;
                marginBottom: number;
                marginRight: number;
                marginLeft: number;
                renderConfig: {
                    zeroWidthParagraphBreak: number;
                    vertexAngle: number;
                    centerAngle: number;
                    background: {
                        rgb: string;
                    };
                };
                autoHyphenation: number;
                doNotHyphenateCaps: number;
                consecutiveHyphenLimit: number;
                defaultHeaderId: string;
                defaultFooterId: string;
                evenPageHeaderId: string;
                evenPageFooterId: string;
                firstPageHeaderId: string;
                firstPageFooterId: string;
                evenAndOddHeaders: number;
                useFirstPageHeaderFooter: number;
                marginHeader: number;
                marginFooter: number;
            };
            locale: string;
            title: string;
            tableSource: {};
            drawings: {};
            drawingsOrder: never[];
            headers: {};
            footers: {};
            body: {
                dataStream: string;
                textRuns: never[];
                customBlocks: never[];
                tables: never[];
                paragraphs: {
                    startIndex: number;
                    paragraphStyle: {
                        spaceAbove: {
                            v: number;
                        };
                        lineSpacing: number;
                        spaceBelow: {
                            v: number;
                        };
                    };
                }[];
                sectionBreaks: {
                    startIndex: number;
                }[];
                customRanges: never[];
                customDecorations: never[];
            };
            settings: {};
            resources: {
                name: string;
                data: string;
            }[];
        };
    };
    unitId: {
        type: StringConstructor;
        default: string;
    };
    collaboration: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    "update:value": (...args: any[]) => void;
    univerStarting: (...args: any[]) => void;
    univerReady: (...args: any[]) => void;
    univerRendered: (...args: any[]) => void;
    univerSteady: (...args: any[]) => void;
    univerBeforeCreated: (...args: any[]) => void;
    univerCreated: (...args: any[]) => void;
    univerInitError: (...args: any[]) => void;
    localImportStarted: (...args: any[]) => void;
    localImportEnded: (...args: any[]) => void;
    localImportSnapshot: (...args: any[]) => void;
    localExportStarted: (...args: any[]) => void;
    localExportEnded: (...args: any[]) => void;
    serverExportStarted: (...args: any[]) => void;
    serverExportEnded: (...args: any[]) => void;
    exchangeStarted: (...args: any[]) => void;
    exchangeEnded: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    locale: {
        type: StringConstructor;
        default(): string;
    };
    license: {
        type: StringConstructor;
        default: string;
    };
    value: {
        type: ObjectConstructor;
        default: () => {
            id: string;
            documentStyle: {
                pageSize: {
                    width: number;
                    height: number;
                };
                documentFlavor: number;
                marginTop: number;
                marginBottom: number;
                marginRight: number;
                marginLeft: number;
                renderConfig: {
                    zeroWidthParagraphBreak: number;
                    vertexAngle: number;
                    centerAngle: number;
                    background: {
                        rgb: string;
                    };
                };
                autoHyphenation: number;
                doNotHyphenateCaps: number;
                consecutiveHyphenLimit: number;
                defaultHeaderId: string;
                defaultFooterId: string;
                evenPageHeaderId: string;
                evenPageFooterId: string;
                firstPageHeaderId: string;
                firstPageFooterId: string;
                evenAndOddHeaders: number;
                useFirstPageHeaderFooter: number;
                marginHeader: number;
                marginFooter: number;
            };
            locale: string;
            title: string;
            tableSource: {};
            drawings: {};
            drawingsOrder: never[];
            headers: {};
            footers: {};
            body: {
                dataStream: string;
                textRuns: never[];
                customBlocks: never[];
                tables: never[];
                paragraphs: {
                    startIndex: number;
                    paragraphStyle: {
                        spaceAbove: {
                            v: number;
                        };
                        lineSpacing: number;
                        spaceBelow: {
                            v: number;
                        };
                    };
                }[];
                sectionBreaks: {
                    startIndex: number;
                }[];
                customRanges: never[];
                customDecorations: never[];
            };
            settings: {};
            resources: {
                name: string;
                data: string;
            }[];
        };
    };
    unitId: {
        type: StringConstructor;
        default: string;
    };
    collaboration: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:value"?: ((...args: any[]) => any) | undefined;
    onUniverStarting?: ((...args: any[]) => any) | undefined;
    onUniverReady?: ((...args: any[]) => any) | undefined;
    onUniverRendered?: ((...args: any[]) => any) | undefined;
    onUniverSteady?: ((...args: any[]) => any) | undefined;
    onUniverBeforeCreated?: ((...args: any[]) => any) | undefined;
    onUniverCreated?: ((...args: any[]) => any) | undefined;
    onUniverInitError?: ((...args: any[]) => any) | undefined;
    onLocalImportStarted?: ((...args: any[]) => any) | undefined;
    onLocalImportEnded?: ((...args: any[]) => any) | undefined;
    onLocalImportSnapshot?: ((...args: any[]) => any) | undefined;
    onLocalExportStarted?: ((...args: any[]) => any) | undefined;
    onLocalExportEnded?: ((...args: any[]) => any) | undefined;
    onServerExportStarted?: ((...args: any[]) => any) | undefined;
    onServerExportEnded?: ((...args: any[]) => any) | undefined;
    onExchangeStarted?: ((...args: any[]) => any) | undefined;
    onExchangeEnded?: ((...args: any[]) => any) | undefined;
}>, {
    value: Record<string, any>;
    locale: string;
    unitId: string;
    license: string;
    collaboration: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
