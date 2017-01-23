// nativescript
import { NativeScriptModule, platformNativeScriptDynamic } from 'nativescript-angular';

// app
import { NativeModule } from './MG.native.module';

platformNativeScriptDynamic().bootstrapModule(NativeModule);
