import { FUniver, Univer, IDocumentData } from '@univerjs/presets';
import { LocaleType, UniverInstanceType, IDisposable, IWorkbookData, DependencyOverride, IUniverConfig, Plugin, PluginCtor } from '@univerjs/core';
export interface IPreset {
    plugins: Array<PluginCtor<Plugin> | [PluginCtor<Plugin>, ConstructorParameters<PluginCtor<Plugin>>[0]]>;
}
export interface IPresetOptions {
    lazy?: boolean;
}
export type CreateUniverOptions = Partial<IUniverConfig> & {
    presets: Array<IPreset | [IPreset, IPresetOptions]>;
    plugins?: Array<PluginCtor<Plugin> | [PluginCtor<Plugin>, ConstructorParameters<PluginCtor<Plugin>>[0]]>;
    override?: DependencyOverride;
    collaboration?: true;
};
export type { IDisposable, IDocumentData, IWorkbookData, DependencyOverride, IUniverConfig, Plugin, PluginCtor };
export { UniverInstanceType };
export type univerInstance = {
    univer: Univer;
    univerAPI: FUniver;
    LocaleType: typeof LocaleType;
};
export type univerInstanceRef = {
    univer: Univer | null;
    univerAPI: FUniver | null;
    LocaleType: typeof LocaleType | null;
};
export * from './create-sheet';
export * from './create-doc';
export * from './snapshot';
