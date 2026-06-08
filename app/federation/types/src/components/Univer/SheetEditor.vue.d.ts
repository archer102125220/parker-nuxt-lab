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
        defalut: string;
    };
    value: {
        type: ObjectConstructor;
        default: () => {
            id: string;
            sheetOrder: string[];
            name: string;
            appVersion: string;
            locale: string;
            styles: {};
            sheets: {
                vYn9cBtHzC_Yp1qUiZSj2: {
                    id: string;
                    name: string;
                    tabColor: string;
                    hidden: number;
                    rowCount: number;
                    columnCount: number;
                    zoomRatio: number;
                    freeze: {
                        xSplit: number;
                        ySplit: number;
                        startRow: number;
                        startColumn: number;
                    };
                    scrollTop: number;
                    scrollLeft: number;
                    defaultColumnWidth: number;
                    defaultRowHeight: number;
                    mergeData: never[];
                    cellData: {
                        0: {
                            0: {
                                v: string;
                                t: number;
                            };
                        };
                    };
                    rowData: {};
                    columnData: {};
                    showGridlines: number;
                    rowHeader: {
                        width: number;
                        hidden: number;
                    };
                    columnHeader: {
                        height: number;
                        hidden: number;
                    };
                    rightToLeft: number;
                };
            };
            resources: {
                name: string;
                data: string;
            }[];
        };
    };
    workbook: {
        type: ObjectConstructor;
        default: () => {};
    };
    worksheet: {
        type: ObjectConstructor;
        default: () => {};
    };
    unitId: {
        type: StringConstructor;
        default: string;
    };
    collaboration: {
        type: BooleanConstructor;
        default: boolean;
    };
    liveShare: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
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
    "update:workbook": (...args: any[]) => void;
    "update:worksheet": (...args: any[]) => void;
    univerChangeStart: (...args: any[]) => void;
    univerChange: (...args: any[]) => void;
    univerChangeEnd: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    locale: {
        type: StringConstructor;
        default(): string;
    };
    license: {
        type: StringConstructor;
        defalut: string;
    };
    value: {
        type: ObjectConstructor;
        default: () => {
            id: string;
            sheetOrder: string[];
            name: string;
            appVersion: string;
            locale: string;
            styles: {};
            sheets: {
                vYn9cBtHzC_Yp1qUiZSj2: {
                    id: string;
                    name: string;
                    tabColor: string;
                    hidden: number;
                    rowCount: number;
                    columnCount: number;
                    zoomRatio: number;
                    freeze: {
                        xSplit: number;
                        ySplit: number;
                        startRow: number;
                        startColumn: number;
                    };
                    scrollTop: number;
                    scrollLeft: number;
                    defaultColumnWidth: number;
                    defaultRowHeight: number;
                    mergeData: never[];
                    cellData: {
                        0: {
                            0: {
                                v: string;
                                t: number;
                            };
                        };
                    };
                    rowData: {};
                    columnData: {};
                    showGridlines: number;
                    rowHeader: {
                        width: number;
                        hidden: number;
                    };
                    columnHeader: {
                        height: number;
                        hidden: number;
                    };
                    rightToLeft: number;
                };
            };
            resources: {
                name: string;
                data: string;
            }[];
        };
    };
    workbook: {
        type: ObjectConstructor;
        default: () => {};
    };
    worksheet: {
        type: ObjectConstructor;
        default: () => {};
    };
    unitId: {
        type: StringConstructor;
        default: string;
    };
    collaboration: {
        type: BooleanConstructor;
        default: boolean;
    };
    liveShare: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
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
    "onUpdate:workbook"?: ((...args: any[]) => any) | undefined;
    "onUpdate:worksheet"?: ((...args: any[]) => any) | undefined;
    onUniverChangeStart?: ((...args: any[]) => any) | undefined;
    onUniverChange?: ((...args: any[]) => any) | undefined;
    onUniverChangeEnd?: ((...args: any[]) => any) | undefined;
}>, {
    value: Record<string, any>;
    locale: string;
    unitId: string;
    collaboration: boolean;
    liveShare: boolean;
    workbook: Record<string, any>;
    worksheet: Record<string, any>;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
